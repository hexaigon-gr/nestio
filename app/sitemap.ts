import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { products } from "@/lib/data/products";
import { STORE_URL } from "@/lib/general/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || STORE_URL;

const sitemap = (): MetadataRoute.Sitemap => {
  const staticRoutes = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/returns", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const staticEntries = staticRoutes.flatMap(
    ({ route, priority, changeFrequency }) =>
      routing.locales.map((locale) => ({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      })),
  );

  const productEntries = products.flatMap((product) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  return [...staticEntries, ...productEntries];
};

export default sitemap;
