import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { products, getProductBySlug } from "@/lib/data/products";
import { ProductDetail } from "@/components/products/product-detail";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const generateStaticParams = () => {
  return products.flatMap((product) =>
    routing.locales.map((locale) => ({
      locale,
      slug: product.slug,
    }))
  );
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;
