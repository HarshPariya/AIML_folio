import type { Metadata } from "next";
import { siteConfig } from "./site";

/** Build a complete Metadata object with sensible OG / Twitter defaults. */
export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = `${siteConfig.name} | ${siteConfig.role}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    applicationName: `${siteConfig.name} Portfolio`,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: `${siteConfig.name} - Portfolio`,
      title,
      description: siteConfig.description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: "@harshpariya",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/favicon.svg",
    },
    ...overrides,
  };
}

/** JSON-LD Person + WebSite structured data for rich results. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.avatar}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Rai University, Ahmedabad",
    },
    knowsAbout: [
      "Machine Learning",
      "Deep Learning",
      "Large Language Models",
      "Computer Vision",
      "Natural Language Processing",
      "Generative AI",
      "Python",
      "PyTorch",
      "TensorFlow",
    ],
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
    ],
  };
}
