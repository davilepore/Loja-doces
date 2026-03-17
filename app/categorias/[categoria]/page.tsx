import { notFound } from "next/navigation";
import { prisma } from "@/prisma/seed";
import { Categoria } from "@/generated/prisma/enums";
import { categorias } from "@/lib/types";
import ListaDoces from "./ListaDoces";

interface Props {
  params: Promise<{
    categoria: string;
  }>;
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;

  const categoriaUrl = categoria.toUpperCase();

  if (!(categoriaUrl in Categoria)) {
    notFound();
  }

  const doces = await prisma.doce.findMany({
    where: {
      categoria: categoriaUrl as Categoria,
    },
  });

  const categoriaData = categorias.find((cat) => cat.slug === categoria);

  if (!categoriaData) {
    notFound();
  }

  return <ListaDoces doces={doces} categoriaData={categoriaData} />;
}
