import Image from "next/image";
import { notFound } from "next/navigation";
import { categorias } from "@/lib/types";
import { prisma } from "@/prisma/seed";
import { Categoria } from "@/generated/prisma/enums";

interface Props {
  params: Promise<{ categoria: string }>;
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;

  const categoriaUrl = categoria.toUpperCase();

  const doces = await prisma.doce.findMany({
    where: {
      categoria: categoriaUrl as Categoria,
    },
  });

  const categoriaData = categorias.find((cat) => cat.nome === categoria);

  if (!categoriaData) {
    notFound();
  }

  return (
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
        {/* Flex-col para manter um por linha e centralizado */}
        <div className="flex flex-col items-center gap-6">
          {doces.map((doce) => (
            <div
              key={doce.id}
              /* max-w-[280px] controla a largura no celular. md:max-w-xs aumenta no PC */
              className="w-full max-w-65 md:max-w-sm bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col transition-transform active:scale-[0.98]"
            >
              {/* Imagem compacta */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={doce.imagemUrl}
                  alt={doce.nome}
                  fill // Faz a imagem preencher o container pai (o div com aspect-4/3)
                  sizes="(max-width: 768px) 260px, 400px" // Ajuda o Next a escolher o tamanho real da imagem
                  className="object-cover" // Mantém a proporção sem distorcer
                  priority={doce.id <= 4} // Carrega as primeiras imagens mais rápido
                />

                <div className="absolute top-2 right-2 z-10 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                  {doce.especificacao.toLowerCase()}
                </div>
              </div>

              {/* Conteúdo centralizado e enxuto */}
              <div className="p-4 flex flex-col items-center text-center">
                <h2 className="text-base font-bold text-slate-800 leading-tight mb-1 capitalize">
                  {doce.nome.toLowerCase()}
                </h2>

                <p className="text-xs text-slate-400 mb-4 italic">
                  {doce.categoria.toLowerCase()}
                </p>

                <button className="w-full bg-slate-900 hover:bg-black text-white text-sm font-medium py-2 rounded-xl transition-colors">
                  Adicionar à sacola
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
