import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { BasePageProps } from "@/types/page-props";
import { Mail, Phone } from "lucide-react";
import { STORE_EMAIL, STORE_PHONE, SOCIAL_LINKS } from "@/lib/general/constants";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const ContactPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <main className="pt-24 pb-16">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {t("description")}
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{t("email")}</p>
              <a
                href={`mailto:${STORE_EMAIL}`}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {STORE_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{t("phone")}</p>
              <a
                href={`tel:${STORE_PHONE.replace(/\s/g, "")}`}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {STORE_PHONE}
              </a>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("orContact")}</h2>
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              TikTok
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Facebook
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
