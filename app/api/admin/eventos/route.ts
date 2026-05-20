import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const eventos = await prisma.evento.findMany({
    include: { itens: true },
    orderBy: { dataInicio: "desc" },
  });
  return NextResponse.json(eventos);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const { itens, ...eventoData } = body;

  const evento = await prisma.evento.create({
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

  return NextResponse.json(evento, { status: 201 });
}