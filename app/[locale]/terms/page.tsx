import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const TermsPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  const sectionIndices = [0, 1, 2, 3, 4] as const;

  return (
    <main className="pt-24 pb-16">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {t("description")}
        </p>

        <div className="space-y-10">
          {sectionIndices.map((index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mb-3">
                {t(`sections.${index}.title`)}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(`sections.${index}.content`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
