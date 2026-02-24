import Image from "next/image";
import { notFound } from "next/navigation";
import { categorias } from "@/lib/types";

interface Props {
  params: Promise<{ categoria: string }>;
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;

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
    </div>
  );
}
