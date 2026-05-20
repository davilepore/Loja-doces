import { prisma } from "@/prisma/seed";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import EventoForm from "../EventoForm";

export default async function EditarEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) redirect("/admin/eventos");

  const evento = await prisma.evento.findUnique({
    where: { id: idNum },
    include: { itens: true },
  });

  if (!evento) redirect("/admin/eventos");

  const eventoSerializado = {
    ...evento,
    dataInicio: evento.dataInicio.toISOString(),
    dataFim: evento.dataFim?.toISOString() ?? null,
  };

  return <EventoForm evento={eventoSerializado} />;
}
