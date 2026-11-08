export interface SiteConfig {
  brand: string;
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  email: string;
  github: string;
  formspreeEndpoint: string;
  repoUrl: string;
  liveUrl: string;
}

export const siteConfig: SiteConfig = {
  brand: "ADANIX.",
  name: "Rahid Adani",
  role: "Full-Stack Developer",
  headline: "I BUILD DIGITAL SYSTEMS.",
  subheadline: "Engineering clean, reliable web applications, clinical diagnostic systems, and robust database architectures from Yogyakarta, Indonesia.",
  email: "rahidadani@gmail.com",
  github: "https://github.com/Adanix",
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "",
  repoUrl: "https://github.com/Adanix/dev-rusuh",
  liveUrl: "",
};
