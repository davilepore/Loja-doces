import { Carousel, CarouselContent, CarouselItem } from "./_ui/carousel";
import Image from "next/image";

export default function SweetTypes() {
  const doces = [
    { id: 1, img: "/bolo.jpg", nome: "Bolos" },
    { id: 2, img: "/brigadeiro.avif", nome: "Docinhos" },
    { id: 3, img: "/brownie.jpg", nome: "Sobremesas" },
  ];
  return (
    <section className="mt-30 space-y-10">
      <h2 className="text-center text-3xl">Nossos doces</h2>
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
            {doces.map((doce) => (
              <CarouselItem key={doce.id} className="basis-[60%] pl-3">
                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden">
                  <Image
                    src={doce.img}
                    alt={doce.nome}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay inferior */}
                  <div className="absolute inset-0 flex flex-col justify-end items-center pb-4 bg-linear-to-t from-black/60 via-black/20 to-transparent">
                    <p className="text-white text-lg font-semibold text-center px-2">
                      {doce.nome}
                    </p>

                    <button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition">
                      Ver mais
                    </button>
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
        {doces.map((doce) => (
          <div key={doce.id} className="relative w-72 h-80">
            <Image
              src={doce.img}
              alt={doce.nome}
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-4 bg-linear-to-t from-black/60 via-black/20 to-transparent">
              <p className="text-white text-lg font-semibold text-center px-2">
                {doce.nome}
              </p>

              <button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition">
                Ver mais
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
