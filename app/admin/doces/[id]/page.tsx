import { prisma } from "@/prisma/seed";
import DoceForm from "../DoceForm";

export default async function EditarDocePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doce = await prisma.doce.findUnique({
    where: { id: parseInt(id) },
  });
  if (!doce) return <p>Doce não encontrado.</p>;
  return <DoceForm doce={doce} />;
}
