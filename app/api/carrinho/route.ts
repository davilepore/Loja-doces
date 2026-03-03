import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { doceId, quantidade, configuracoes } = await req.json();

  const carrinho = await prisma.carrinho.create({
    data: {
      sessionId: "abc123",
    },
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
}
