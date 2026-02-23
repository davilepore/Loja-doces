import { Carousel, CarouselContent, CarouselItem } from "./_ui/carousel";
import Image from "next/image";

export default function SweetTypes() {
  const doces = [
    { id: 1, img: "/docinhos.jpg", nome: "Bolos" },
    { id: 2, img: "/docinhos.jpg", nome: "Cupcakes" },
    { id: 3, img: "/docinhos.jpg", nome: "Brigadeiros" },
  ];
  return (
    <section className="mt-30 space-y-10">
      <h2 className="text-center text-3xl">Nossos doces</h2>
      {/* MOBILE */}
      <div className="md:hidden">
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {doces.map((doce) => (
                <CarouselItem key={doce.id} className="basis-4/5">
                  <div className="relative w-full h-64">
                    <Image
                      src={doce.img}
                      alt={doce.nome}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* DESKTOP */}
      {/* DESKTOP */}
      <div className="hidden md:flex gap-6 justify-center">
        {doces.map((doce) => (
          <div key={doce.id} className="relative w-72 h-64">
            <Image
              src={doce.img}
              alt={doce.nome}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
