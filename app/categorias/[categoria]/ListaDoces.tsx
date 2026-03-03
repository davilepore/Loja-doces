"use client";

import { Categoria, Especificacao } from "@/generated/prisma/enums";
import Image from "next/image";
import { useState } from "react";
import FormBolos from "./FormBolos";
import FormDocinhos from "./FormDocinhos";
import FormSobremesas from "./FormSobremesas";

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

  let conteudo;

  if (doceSelecionado?.categoria === "BOLOS") {
    conteudo = <FormBolos />;
  } else if (doceSelecionado?.categoria === "DOCINHOS") {
    conteudo = <FormDocinhos />;
  } else {
    conteudo = <FormSobremesas />;
  }

  return (
    <>
      <div>
        <div className="relative w-full h-100">
          <Image
            src={categoriaData.imagem}
            alt={categoriaData.titulo}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">
              {categoriaData.titulo}
            </h1>
          </div>
        </div>

        <div className="p-10 text-center">
          <p className="text-lg">{categoriaData.descricao}</p>
        </div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            {doces.map((doce) => (
              <div
                key={doce.id}
                className="w-full max-w-65 md:max-w-sm bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col transition-transform active:scale-[0.98]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={doce.imagemUrl}
                    alt={doce.nome}
                    fill
                    sizes="(max-width: 768px) 260px, 400px"
                    className="object-cover"
                    priority={doce.id <= 4}
                  />

                  <div className="absolute top-2 right-2 z-10 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    {doce.especificacao.toLowerCase()}
                  </div>
                </div>

                <div className="p-4 flex flex-col items-center text-center">
                  <h2 className="text-base font-bold text-slate-800 leading-tight mb-1 capitalize">
                    {doce.nome.toLowerCase()}
                  </h2>

                  <p className="text-xs text-slate-400 mb-4 italic">
                    {doce.categoria.toLowerCase()}
                  </p>

                  <button
                    onClick={() => onAddItemClick(doce)}
                    className="w-full bg-slate-900 hover:bg-black text-white text-sm font-medium py-2 rounded-xl transition-colors"
                  >
                    Adicionar à sacola
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {doceSelecionado && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl w-80">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={doceSelecionado.imagemUrl}
                alt={doceSelecionado.nome}
                fill
                sizes="(max-width: 768px) 260px, 400px"
                className="object-cover"
              />
            </div>
            <h2 className="font-bold mb-4">Escolha as opções</h2>

            {conteudo}
          </div>
        </div>
      )}
    </>
  );
}
