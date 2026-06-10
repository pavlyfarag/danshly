import { site } from "@/lib/site";

/**
 * Structured data for search engines: one @graph with the organization,
 * its founders and the website entity.
 *
 * Note: data-block scripts (type="application/ld+json") are never executed,
 * so the strict CSP does not apply to them — crawlers read them from markup.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.description,
        logo: `${site.url}/icon.svg`,
        sameAs: [site.social.github, site.social.linkedin],
        founder: [
          {
            "@type": "Person",
            name: "Pavly",
            jobTitle: "Senior DevOps Engineer",
            knowsAbout: [
              "Kubernetes",
              "CI/CD",
              "Infrastructure as Code",
              "Security",
              "Self-hosting",
            ],
          },
          {
            "@type": "Person",
            name: "Shery",
            jobTitle: "Senior Full Stack Engineer",
            knowsAbout: [
              "UI/UX Engineering",
              "State Management",
              "API Design",
              "Semantic SEO",
            ],
          },
        ],
        knowsAbout: [
          "Web Platform Engineering",
          "DevOps",
          "Self-hosted Infrastructure",
          "Full Stack Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape `<` so the payload can never close the script context.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
