import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const CheckoutPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutForm />;
};

export default CheckoutPage;
