import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const AboutPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <main className="pt-24 pb-16">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {t("description")}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{t("story")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("storyText")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{t("mission")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("missionText")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{t("whyUs")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("whyUsText")}
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
