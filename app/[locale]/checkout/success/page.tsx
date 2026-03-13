import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";
import { CheckoutSuccess } from "@/components/checkout/checkout-success";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const SuccessPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutSuccess />;
};

export default SuccessPage;
