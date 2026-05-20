// components/EventosEspeciais.tsx
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "./_ui/carousel";
import Image from "next/image";
import { ChevronRight, CalendarDays } from "lucide-react";
import { prisma } from "@/prisma/seed";

export default async function EventosEspeciais() {
  const eventos = await prisma.evento.findMany({
    where: {
      ativo: true,
      OR: [{ dataFim: null }, { dataFim: { gte: new Date() } }],
    },
    include: { itens: true },
    orderBy: { dataInicio: "asc" },
    take: 8,
  });

  if (eventos.length === 0) return null;

  return (
    <section className="mt-20 px-4 space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-[#44201F] mt-10">
          Eventos Especiais
        </h2>
        <div className="w-20 h-1 bg-[#7dd0c2] mx-auto rounded-full" />
      </div>

      <div className="md:hidden">
        <Carousel
          opts={{ align: "center", containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {eventos.map((evento) => (
              <CarouselItem key={evento.id} className="basis-[65%] pl-3">
                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-lg border border-[#44201F]/10">
                  {evento.imagemUrl ? (
                    <Image
                      src={evento.imagemUrl}
                      alt={evento.titulo}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#fdf2f4] to-[#fce7ec] flex items-center justify-center text-6xl">
                      🎉
                    </div>
                  )}

                  <div className="absolute inset-0 flex flex-col justify-end items-center pb-6 bg-linear-to-t from-[#44201F]/80 via-[#44201F]/20 to-transparent">
                    <DataBadge
                      dataInicio={evento.dataInicio}
                      dataFim={evento.dataFim}
                    />

                    <p className="text-white text-lg font-bold text-center px-2 mb-1 tracking-wide uppercase">
                      {evento.titulo}
                    </p>

                    {evento.itens.length > 0 && (
                      <p className="text-white/70 text-xs mb-3">
                        {evento.itens.length} item(ns) disponível(is)
                      </p>
                    )}

                    <Link
                      href={`/infosevento/${evento.id}`}
                      className="flex items-center gap-1 bg-[#7dd0c2] hover:bg-[#6bc1b3] text-[#44201F] text-[11px] font-black px-3 py-1.5 rounded-full transition-all shadow-md active:scale-95 uppercase tracking-tight"
                    >
                      Ver Evento
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
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="group relative w-72 h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {evento.imagemUrl ? (
              <Image
                src={evento.imagemUrl}
                alt={evento.titulo}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#fdf2f4] to-[#fce7ec] flex items-center justify-center text-7xl">
                🎉
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-[#44201F]/90 via-[#44201F]/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

            <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 p-4">
              <DataBadge
                dataInicio={evento.dataInicio}
                dataFim={evento.dataFim}
              />

              <p className="text-white text-xl font-bold text-center mb-1 tracking-wider uppercase">
                {evento.titulo}
              </p>

              {evento.descricao && (
                <p className="text-white/60 text-xs text-center mb-2 line-clamp-2 px-2">
                  {evento.descricao}
                </p>
              )}

              {evento.itens.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mb-3 px-2">
                  {evento.itens.slice(0, 3).map((item) => (
                    <span
                      key={item.id}
                      className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm"
                    >
                      {item.nome}
                    </span>
                  ))}
                  {evento.itens.length > 3 && (
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                      +{evento.itens.length - 3}
                    </span>
                  )}
                </div>
              )}

              <Link
                href={`/infosevento/${evento.id}`}
                className="flex items-center gap-1.5 bg-[#7dd0c2] hover:bg-[#6bc1b3] text-[#44201F] text-xs font-black px-4 py-2 rounded-full transition-all shadow-lg active:scale-95 uppercase tracking-tighter"
              >
                Ver Evento
                <ChevronRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DataBadge({
  dataInicio,
  dataFim,
}: {
  dataInicio: Date;
  dataFim: Date | null;
}) {
  const fmt = (d: Date) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

  return (
    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full mb-2">
      <CalendarDays size={11} />
      {fmt(dataInicio)}
      {dataFim && ` → ${fmt(dataFim)}`}
    </div>
  );
}
