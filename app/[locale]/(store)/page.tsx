import { setRequestLocale } from "next-intl/server";
import { BasePageProps } from "@/types/page-props";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { TrustBadges } from "@/components/home/trust-badges";

const Home = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <TrustBadges />
    </>
  );
};

export default Home;
