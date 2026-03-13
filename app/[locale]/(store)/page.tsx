import { setRequestLocale } from "next-intl/server";
import { BasePageProps } from "@/types/page-props";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WhyNestio } from "@/components/home/why-nestio";
import { LifestyleBanner } from "@/components/home/lifestyle-banner";
import { ReviewsSection } from "@/components/home/reviews-section";
import { TrustBadges } from "@/components/home/trust-badges";
import { NewsletterSection } from "@/components/home/newsletter-section";

const Home = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyNestio />
      <LifestyleBanner />
      <ReviewsSection />
      <TrustBadges />
      <NewsletterSection />
    </>
  );
};

export default Home;
