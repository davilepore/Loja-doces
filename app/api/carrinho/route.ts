import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { doceId, quantidade, configuracoes } = await req.json();

    const carrinho = await prisma.carrinho.upsert({
      where: { sessionId: "abc123" },
      update: {},
      create: { sessionId: "abc123" },
    });

    await prisma.itemCarrinho.create({
      data: {
        carrinhoId: carrinho.id,
        doceId,
        quantidade,
        configuracoes,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}

export async function GET() {
  const carrinho = await prisma.carrinho.findUnique({
    where: {
      sessionId: "abc123",
    },
    include: {
      itens: {
        include: {
          doce: true,
        },
      },
    },
  });

  return NextResponse.json(carrinho);
}
