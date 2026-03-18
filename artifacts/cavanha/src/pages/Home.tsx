import { useState, lazy, Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Categories } from "@/components/sections/Categories";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { SocialCTA } from "@/components/sections/SocialCTA";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { PRODUCTS } from "@/lib/mock-data";
import type { Product } from "@/lib/mock-data";

const DeliveryMap = lazy(() => import("@/components/sections/DeliveryMap").then(m => ({ default: m.DeliveryMap })));

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export function Home({ onAddToCart }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState("");

  const filteredProducts = activeCategory
    ? PRODUCTS.filter((p) => p.category === activeCategory)
    : PRODUCTS;

  return (
    <>
      <Hero />
      <TrustBar />
      <PromoBanner />
      <Categories onSelect={setActiveCategory} />
      <div id="produtos">
        <ProductCarousel products={filteredProducts} activeCategory={activeCategory} onAddToCart={onAddToCart} />
      </div>
      <div id="obras">
        <Testimonials />
      </div>
      <Suspense fallback={<div className="h-[600px] animate-pulse bg-gray-100" />}>
        <DeliveryMap />
      </Suspense>
      <div id="sobre">
        <Timeline />
      </div>
      <BrandsMarquee />
      <SocialCTA />
      <div id="contato">
        <MegaFooter />
      </div>
    </>
  );
}
