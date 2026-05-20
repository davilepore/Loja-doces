import { prisma } from "@/prisma/seed";
import { redirect } from "next/navigation";
import { ChevronLeft, Calendar, Clock, FileText } from "lucide-react";
import Link from "next/link";
import ListaItensEvento from "@/app/_components/ListaItensEvento";

export default async function InfosEvento({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parseInt(id);

  const evento = await prisma.evento.findUnique({
    where: { id: idNum },
    include: { itens: true },
  });

  if (!evento) redirect("/");

  return (
    <div className="bg-[#fdfaf8] min-h-screen">
      <div className="relative w-full h-56 md:h-72 bg-[#44201F] overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#7dd0c2]/10" />
        <div className="absolute -bottom-16 -left-8 w-72 h-72 rounded-full bg-[#7dd0c2]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3" />

        <Link
          href="/"
          className="absolute top-5 left-5 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2.5 rounded-full transition-all"
        >
          <ChevronLeft size={22} className="text-white" />
        </Link>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[#7dd0c2] text-xs font-black uppercase tracking-[0.3em] mb-3">
            Detalhes do Evento
          </span>
          <h1 className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            {evento.titulo}
          </h1>
          <div className="w-16 h-1.5 bg-[#7dd0c2] mt-4 rounded-full" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#44201f]/5 flex items-center gap-4">
            <div className="bg-[#44201F]/8 p-3 rounded-2xl shrink-0">
              <Calendar size={20} className="text-[#44201F]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#7dd0c2] uppercase tracking-widest mb-0.5">
                Data de Início
              </p>
              <p className="text-[#44201F] font-bold text-sm">
                {evento.dataInicio.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {evento.dataFim && (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#44201f]/5 flex items-center gap-4">
              <div className="bg-[#7dd0c2]/15 p-3 rounded-2xl shrink-0">
                <Clock size={20} className="text-[#44201F]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#7dd0c2] uppercase tracking-widest mb-0.5">
                  Data de Fim
                </p>
                <p className="text-[#44201F] font-bold text-sm">
                  {evento.dataFim.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {evento.descricao && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#44201f]/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#44201F]/8 p-2.5 rounded-xl">
                <FileText size={18} className="text-[#44201F]" />
              </div>
              <p className="text-[10px] font-black text-[#7dd0c2] uppercase tracking-widest">
                Descrição
              </p>
            </div>
            <p className="text-[#44201F]/75 leading-relaxed text-sm italic">
              &ldquo;{evento.descricao}&rdquo;
            </p>
          </div>
        )}

        {evento.itens && evento.itens.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#44201f]/5">
            <ListaItensEvento itens={evento.itens} />
          </div>
        )}
      </div>
    </div>
  );
}
