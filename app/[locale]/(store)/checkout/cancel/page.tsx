import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";
import { CheckoutCancel } from "@/components/checkout/checkout-cancel";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const CancelPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutCancel />;
};

export default CancelPage;
