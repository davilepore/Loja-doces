"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem } from "./_ui/carousel";

export default function HeroCarousel() {
  return (
    <Carousel
      className="w-screen"
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
          <div className="relative w-full h-[50vh] sm:h-[70vh]">
            <Image
              src="/docinhos.jpg"
              fill
              priority
              className="object-cover"
              alt="Imagem 1"
              sizes="100vw"
            />
          </div>
        </CarouselItem>

        <CarouselItem className="basis-full">
          <div className="relative w-full h-[50vh] sm:h-[70vh]">
            <Image
              src="/docinhos.jpg"
              fill
              className="object-cover"
              alt="Imagem 2"
              sizes="100vw"
            />
          </div>
        </CarouselItem>

        <CarouselItem className="basis-full">
          <div className="relative w-full h-[50vh] sm:h-[70vh]">
            <Image
              src="/docinhos.jpg"
              fill
              className="object-cover"
              alt="Imagem 3"
              sizes="100vw"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
