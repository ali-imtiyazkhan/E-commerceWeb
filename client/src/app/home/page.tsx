"use client";

import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect, useState } from "react";

const gridItems = [
  {
    title: "WOMEN",
    subtitle: "From world's top designer",
    image:
      "https://images.unsplash.com/photo-1614251056216-f748f76cd228?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "FALL LEGENDS",
    subtitle: "Timeless cool weather",
    image:
      "https://avon-demo.myshopify.com/cdn/shop/files/demo1-winter1_600x.png?v=1733380268",
  },
  {
    title: "ACCESSORIES",
    subtitle: "Everything you need",
    image:
      "https://avon-demo.myshopify.com/cdn/shop/files/demo1-winter4_600x.png?v=1733380275",
  },
  {
    title: "HOLIDAY SPARKLE EDIT",
    subtitle: "Party season ready",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop",
  },
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banners, featuredProducts, fetchFeaturedProducts, fetchBanners } =
    useSettingsStore();

  useEffect(() => {
    fetchBanners();
    fetchFeaturedProducts();
  }, [fetchBanners, fetchFeaturedProducts]);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(bannerTimer);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-300 selection:text-indigo-900">

      <section className="relative h-[600px] overflow-hidden select-none">
        {banners.map((bannerItem, index) => (
          <div className="absolute inset-0 z-20">
            <img
              src="/images/banner.webp"
              alt="Banner"
              className="w-full h-full object-cover filter brightness-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

            <div className="relative h-full container mx-auto px-6 flex flex-col justify-center max-w-7xl">
              <div className="max-w-xl space-y-6 text-white drop-shadow-lg">
                <span className="text-sm uppercase tracking-widest text-indigo-300">
                  I AM JOHN
                </span>
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                  BEST SELLING
                  <br />
                  E-COMMERCE WEBSITE
                </h1>
                <p className="text-lg text-indigo-200">
                  A Creative, Flexible, Clean, Easy to use and
                  <br />
                  High Performance E-Commerce Theme
                </p>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg transition-shadow duration-300">
                  SHOP NOW
                </Button>
              </div>
            </div>
          </div>

        ))}


        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? "bg-indigo-600 w-8 shadow-lg"
                  : "bg-indigo-300 hover:bg-indigo-400"
                }`}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-center text-4xl font-extrabold mb-3 tracking-wide text-gray-900">
            THE WINTER EDIT
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Designed to keep your satisfaction and warmth
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {gridItems.map((gridItem, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                  <img
                    src={gridItem.image}
                    alt={gridItem.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                  <div className="text-center text-white px-6">
                    <h3 className="text-2xl font-semibold mb-2 tracking-wide">
                      {gridItem.title}
                    </h3>
                    <p className="text-sm mb-4">{gridItem.subtitle}</p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium shadow-md transition-shadow duration-300">
                      SHOP NOW
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-center text-4xl font-extrabold mb-3 tracking-wide text-gray-900">
            NEW ARRIVALS
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Shop our new arrivals from established brands
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((productItem, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-400 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                  <img
                    src={productItem.images[0]}
                    alt={productItem.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                  <div className="text-center text-white px-6">
                    <h3 className="text-2xl font-semibold mb-1 tracking-wide">
                      {productItem.name}
                    </h3>
                    <p className="text-lg font-semibold mb-4">
                      ${productItem.price.fixed()}
                    </p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium shadow-md transition-shadow duration-300">
                      QUICK VIEW
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
