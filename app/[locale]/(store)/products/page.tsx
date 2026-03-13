import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";
import { ProductsCatalog } from "@/components/products/products-catalog";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const ProductsPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsCatalog />;
};

export default ProductsPage;
