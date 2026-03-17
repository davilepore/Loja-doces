"use client";

import { Categoria, Especificacao } from "@/generated/prisma/enums";
import Image from "next/image";
import { useState } from "react";
import FormBolos from "./FormBolos";
import FormDocinhos from "./FormDocinhos";
import FormSobremesas from "./FormSobremesas";
import { ArrowLeft, Plus } from "lucide-react";

type Doce = {
  id: number;
  nome: string;
  categoria: Categoria;
  especificacao: Especificacao;
  imagemUrl: string;
};

type CategoriaData = {
  id: number;
  nome: string;
  slug: string;
  titulo: string;
  imagem: string;
  descricao: string;
};

type Props = {
  doces: Doce[];
  categoriaData: CategoriaData;
};

export default function ListaDoces({ doces, categoriaData }: Props) {
  const [doceSelecionado, setDoceSelecionado] = useState<Doce | null>(null);

  const onAddItemClick = (doce: Doce) => {
    setDoceSelecionado(doce);
  };

  let conteudo = null;
  if (doceSelecionado?.categoria === "BOLOS") {
    conteudo = <FormBolos doceId={doceSelecionado!.id} />;
  } else if (doceSelecionado?.categoria === "DOCINHOS") {
    conteudo = <FormDocinhos doceId={doceSelecionado!.id} />;
  } else if (doceSelecionado?.categoria === "SOBREMESAS") {
    conteudo = <FormSobremesas doceId={doceSelecionado.id} />;
  }

  return (
    <div className="bg-[#fdfaf8] min-h-screen">
      {/* Banner da Categoria */}
      <div className="relative w-full h-75 md:h-100">
        <Image
          src={categoriaData.imagem}
          alt={categoriaData.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#44201F]/60 to-[#44201F]/20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase">
            {categoriaData.titulo}
          </h1>
          <div className="w-20 h-1.5 bg-[#7dd0c2] mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Descrição */}
      <div className="max-w-3xl mx-auto p-10 text-center">
        <p className="text-lg md:text-xl text-[#44201F]/80 italic leading-relaxed">
          &quot;{categoriaData.descricao}&quot;
        </p>
      </div>

      {/* Grid de Doces - Anti-vazamento Desktop */}
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <div className="flex flex-wrap justify-center gap-8">
          {doces.map((doce) => (
            <div
              key={doce.id}
              className="group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] max-w-[320px] bg-white rounded-3xl shadow-lg shadow-[#44201f]/5 border border-[#44201f]/5 overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Imagem do Produto */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={doce.imagemUrl}
                  alt={doce.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-[#7dd0c2] text-[#44201F] text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase">
                  {doce.especificacao}
                </div>
              </div>

              {/* Detalhes */}
              <div className="p-5 flex flex-col items-center text-center">
                <h2 className="text-xl font-bold text-[#44201F] leading-tight mb-1 capitalize">
                  {doce.nome.toLowerCase()}
                </h2>
                <p className="text-sm text-[#7dd0c2] font-semibold mb-4 uppercase tracking-widest">
                  {doce.categoria.toLowerCase()}
                </p>

                <button
                  onClick={() => onAddItemClick(doce)}
                  className="w-full bg-[#44201F] hover:bg-[#5a3332] text-white text-sm font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Plus size={18} className="text-[#7dd0c2]" />
                  Adicionar à sacola
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Estilizado */}
      {doceSelecionado && (
        <div className="fixed inset-0 bg-[#44201F]/80 backdrop-blur-sm flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-48 w-full">
              <Image
                src={doceSelecionado.imagemUrl}
                alt={doceSelecionado.nome}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setDoceSelecionado(null)}
                className="absolute top-4 left-4 bg-white/90 p-2 rounded-full text-[#44201F] hover:bg-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-[#44201F] uppercase tracking-tighter leading-none">
                  {doceSelecionado.nome}
                </h2>
                <span className="text-[#7dd0c2] text-xs font-bold uppercase tracking-widest">
                  Configurar Pedido
                </span>
              </div>

              <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {conteudo}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
