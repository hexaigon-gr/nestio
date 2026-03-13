import type { MetadataRoute } from "next";
import { STORE_URL } from "@/lib/general/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || STORE_URL;

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
