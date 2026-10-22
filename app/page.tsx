import { ContactForm } from "@/components/copper/contact-form";
import { Hero } from "@/components/copper/hero";
import { PlusPricing } from "@/components/copper/plus-pricing";
import { PrivacySummary } from "@/components/copper/privacy-summary";
import { Products } from "@/components/copper/products";
import { Showcase } from "@/components/copper/showcase";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { getPlans, getPrivacySummary, getProducts } from "@/lib/copper/catalog";

export default function Home() {
  const products = getProducts();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero products={products} />
        <Products products={products} />
        <Showcase products={products} />
        <PlusPricing plans={getPlans()} />
        <PrivacySummary privacy={getPrivacySummary()} />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
