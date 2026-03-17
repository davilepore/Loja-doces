import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "./_ui/carousel";
import Image from "next/image";
import { categorias } from "@/lib/types";
import { ChevronRight } from "lucide-react";

export default function SweetTypes() {
  return (
    <section className="mt-20 px-4 space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-[#44201F] mt-10">
          Nossas Categorias
        </h2>
        <div className="w-20 h-1 bg-[#7dd0c2] mx-auto rounded-full"></div>
      </div>

      <div className="md:hidden">
        <Carousel
          opts={{
            align: "center",
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {categorias.map((categoria) => (
              <CarouselItem key={categoria.id} className="basis-[65%] pl-3">
                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-lg border border-[#44201F]/10">
                  <Image
                    src={categoria.imagem}
                    alt={categoria.nome}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end items-center pb-6 bg-linear-to-t from-[#44201F]/80 via-[#44201F]/20 to-transparent">
                    <p className="text-white text-lg font-bold text-center px-2 mb-3 tracking-wide uppercase">
                      {categoria.nome}
                    </p>

                    <Link
                      href={`/categorias/${categoria.slug}`}
                      className="flex items-center gap-1 bg-[#7dd0c2] hover:bg-[#6bc1b3] text-[#44201F] text-[11px] font-black px-3 py-1.5 rounded-full transition-all shadow-md active:scale-95 uppercase tracking-tight"
                    >
                      Ver Mais
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden md:flex gap-6 justify-center max-w-full flex-wrap mx-auto px-4">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className="group relative w-72 h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={categoria.imagem}
              alt={categoria.nome}
              fill
              sizes="300px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#44201F]/90 via-[#44201F]/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

            <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 p-4">
              <p className="text-white text-xl font-bold text-center mb-4 tracking-wider uppercase">
                {categoria.nome}
              </p>

              <Link
                href={`/categorias/${categoria.slug}`}
                className="flex items-center gap-1.5 bg-[#7dd0c2] hover:bg-[#6bc1b3] text-[#44201F] text-xs font-black px-4 py-2 rounded-full transition-all shadow-lg active:scale-95 uppercase tracking-tighter"
              >
                Ver Mais
                <ChevronRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
