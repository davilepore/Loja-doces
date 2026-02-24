import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "./_ui/carousel";
import Image from "next/image";
import { categorias } from "@/lib/types";

export default function SweetTypes() {
  return (
    <section className="mt-20 space-y-10">
      <h2 className="text-center text-3xl font-semibold">Nossos categorias</h2>
      {/* MOBILE */}
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
              <CarouselItem key={categoria.id} className="basis-[60%] pl-3">
                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden">
                  <Image
                    src={categoria.imagem}
                    alt={categoria.nome}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay inferior */}
                  <div className="absolute inset-0 flex flex-col justify-end items-center pb-4 bg-linear-to-t from-black/60 via-black/20 to-transparent">
                    <p className="text-white text-lg font-semibold text-center px-2">
                      {categoria.nome}
                    </p>

                    <Link
                      href={`/categorias/${categoria.slug}`}
                      className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition"
                    >
                      Ver Mais
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* DESKTOP */}
      {/* DESKTOP */}
      <div className="hidden md:flex gap-6 justify-center">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="relative w-72 h-80">
            <Image
              src={categoria.imagem}
              alt={categoria.nome}
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-4 bg-linear-to-t from-black/60 via-black/20 to-transparent">
              <p className="text-white text-lg font-semibold text-center px-2">
                {categoria.nome}
              </p>

              <Link
                className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition"
                href={`/categorias/${categoria.slug}`}
              >
                Ver Mais
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
