import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/fr/checkout/",
        "/de/checkout/",
        "/en/checkout/",
        "/it/checkout/",
        "/fr/admin",
        "/de/admin",
        "/en/admin",
        "/it/admin",
        "/fr/compte/",
        "/de/compte/",
        "/en/compte/",
        "/it/compte/",
        "/api/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
