"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem } from "./_ui/carousel";

export default function HeroCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="basis-full">
            <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[75vh] lg:h-[85vh]">
              <Image
                src="/docinhos.jpg"
                fill
                priority
                className="object-cover"
                alt="Destaque Doces MaBecky 1"
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          </CarouselItem>

          <CarouselItem className="basis-full">
            <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[75vh] lg:h-[85vh]">
              <Image
                src="/docinhos.jpg"
                fill
                className="object-cover"
                alt="Destaque Doces MaBecky 2"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </CarouselItem>

          <CarouselItem className="basis-full">
            <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[75vh] lg:h-[85vh]">
              <Image
                src="/docinhos.jpg"
                fill
                className="object-cover"
                alt="Destaque Doces MaBecky 3"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
