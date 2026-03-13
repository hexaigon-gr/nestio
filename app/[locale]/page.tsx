import { setRequestLocale } from "next-intl/server";
import { BasePageProps } from "@/types/page-props";
import { HeroSection } from "@/components/home/hero-section";

const Home = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
    </main>
  );
};

export default Home;
