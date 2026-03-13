import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const CartPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartPageContent />;
};

export default CartPage;
