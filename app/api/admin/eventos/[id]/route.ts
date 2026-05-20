import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const body = await req.json();
  const { itens, ...eventoData } = body;

 
  await prisma.eventoItem.deleteMany({ where: { eventoId: id } });

  const evento = await prisma.evento.update({
    where: { id },
    data: {
      ...eventoData,
      dataInicio: new Date(eventoData.dataInicio),
      dataFim: eventoData.dataFim ? new Date(eventoData.dataFim) : null,
      itens: {
        create: itens ?? [],
      },
    },
    include: { itens: true },
  });

  return NextResponse.json(evento);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });


  await prisma.evento.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}