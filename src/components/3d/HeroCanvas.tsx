import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, RotateCcw } from "lucide-react";

export const HeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // References to control Three.js scene externally
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const isPlayingRef = useRef<boolean>(true);
  const animFrameIdRef = useRef<number>(0);

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0.005, y: 0.003 });

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // 1. Outer Polyhedron (Icosahedron Wireframe)
    const icosahedronGeom = new THREE.IcosahedronGeometry(1.6, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635, // Electric lime
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const wireframeMesh = new THREE.Mesh(icosahedronGeom, wireframeMat);
    group.add(wireframeMesh);

    // 2. Vertex Points (Glowing nodes)
    const pointsMat = new THREE.PointsMaterial({
      color: 0x60a5fa, // Electric blue
      size: 0.07,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(icosahedronGeom, pointsMat);
    group.add(pointsMesh);

    // 3. Inner Crystalline Core
    const coreGeom = new THREE.OctahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x141923,
      emissive: 0x1e293b,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    group.add(coreMesh);

    // 4. Orbital Ring
    const torusGeom = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.45,
    });
    const torusMesh = new THREE.Mesh(torusGeom, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    group.add(torusMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightLime = new THREE.PointLight(0xa3e635, 3, 10);
    pointLightLime.position.set(3, 3, 3);
    scene.add(pointLightLime);

    const pointLightBlue = new THREE.PointLight(0x60a5fa, 3, 10);
    pointLightBlue.position.set(-3, -3, 2);
    scene.add(pointLightBlue);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (groupRef.current) {
        if (isPlayingRef.current && !isDraggingRef.current) {
          // Autonomous subtle rotation
          groupRef.current.rotation.y += velocityRef.current.y;
          groupRef.current.rotation.x += velocityRef.current.x;

          // Gentle core pulse
          const elapsedTime = performance.now() * 0.001;
          const scale = 1 + Math.sin(elapsedTime * 2) * 0.04;
          coreMesh.scale.set(scale, scale, scale);
        } else if (!isPlayingRef.current && isDraggingRef.current) {
          // Manual drag while paused
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Pointer Drag Handlers
    const onPointerDown = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current || !groupRef.current) return;

      const deltaX = clientX - previousPointerPositionRef.current.x;
      const deltaY = clientY - previousPointerPositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      velocityRef.current = {
        x: deltaY * 0.001,
        y: deltaX * 0.001,
      };

      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      // Clamp velocity to reasonable drift
      velocityRef.current.x = Math.max(Math.min(velocityRef.current.x, 0.01), -0.01) || 0.003;
      velocityRef.current.y = Math.max(Math.min(velocityRef.current.y, 0.01), -0.01) || 0.004;
    };

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onPointerUp();

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    domElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener("resize", handleResize);

      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      domElement.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      icosahedronGeom.dispose();
      wireframeMat.dispose();
      pointsMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      torusGeom.dispose();
      torusMat.dispose();

      renderer.dispose();
      if (container && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
    };
  }, []);

  // Sync isPlaying state to ref
  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    isPlayingRef.current = nextState;
  };

  const resetRotation = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
      velocityRef.current = { x: 0.003, y: 0.004 };
    }
    setIsPlaying(true);
    isPlayingRef.current = true;
  };

  if (!webglSupported) {
    return (
      <div className="relative w-full h-[320px] sm:h-[420px] flex items-center justify-center bg-[#141923]/50 rounded-2xl border border-white/[0.08]">
        <div className="relative w-48 h-48 border-2 border-[#A3E635]/40 rounded-full animate-spin [animation-duration:18s] flex items-center justify-center">
          <div className="w-32 h-32 border-2 border-dashed border-[#60A5FA]/60 rounded-full animate-spin [animation-duration:10s]"></div>
          <div className="absolute w-12 h-12 bg-[#A3E635] rounded-lg rotate-45 opacity-80"></div>
        </div>
        <div className="absolute bottom-4 text-xs font-mono text-slate-400">
          // 2D Static Visual Fallback
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[440px] flex items-center justify-center">
      {/* Three.js canvas container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate 3D object"
      />

      {/* Control overlay */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 bg-[#141923]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.1] shadow-lg">
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mr-1 hidden sm:inline">
          3D Scene
        </span>
        <button
          type="button"
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-white/[0.1] text-slate-200 hover:text-[#A3E635] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3E635]"
          title={isPlaying ? "Pause rotation" : "Play rotation"}
          aria-label={isPlaying ? "Pause 3D rotation" : "Start 3D rotation"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={resetRotation}
          className="p-1.5 rounded-full hover:bg-white/[0.1] text-slate-200 hover:text-[#A3E635] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3E635]"
          title="Reset rotation to default"
          aria-label="Reset 3D rotation to initial angle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Drag Hint */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 pointer-events-none text-[11px] font-mono text-slate-400/80 bg-[#090B10]/60 px-2.5 py-1 rounded-md border border-white/[0.05]">
        Drag to inspect
      </div>
    </div>
  );
};
