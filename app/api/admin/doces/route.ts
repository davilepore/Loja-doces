import { prisma } from "@/prisma/seed";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET - listar todos
export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  // busca no seu banco aqui
  const doces = await prisma.doce.findMany();
  return NextResponse.json(doces);
}

// POST - criar novo
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await request.json();
  const novoDoce = await prisma.doce.create({ data: body });
  return NextResponse.json(novoDoce, { status: 201 });
}