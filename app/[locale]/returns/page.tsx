import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const ReturnsPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Returns");

  const policyPoints = [0, 1, 2, 3, 4, 5] as const;

  return (
    <main className="pt-24 pb-16">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {t("description")}
        </p>

        <ul className="space-y-4">
          {policyPoints.map((index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="text-muted-foreground leading-relaxed">
                {t(`policy.${index}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ReturnsPage;
