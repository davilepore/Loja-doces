import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sessionId, eventoItemId, quantidade } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "SessionId é obrigatório" },
        { status: 400 }
      );
    }

    const carrinho = await prisma.carrinho.upsert({
      where: { sessionId },
      update: {},
      create: { sessionId },
    });

    await prisma.itemCarrinho.create({
      data: {
        carrinhoId: carrinho.id,
        eventoItemId,
        quantidade,
        configuracoes: {},
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}