import { prisma } from "@/prisma/seed"; // Dica: Geralmente usamos @/lib/prisma, mas mantive seu padrão
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Agora pegamos o sessionId que enviamos pelo formulário
    const { sessionId, doceId, quantidade, configuracoes } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "SessionId é obrigatório" },
        { status: 400 },
      );
    }

    // Usamos o sessionId real do usuário para buscar ou criar o carrinho
    const carrinho = await prisma.carrinho.upsert({
      where: { sessionId: sessionId },
      update: {},
      create: { sessionId: sessionId },
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

export async function GET(req: Request) {
  try {
    // Pegamos o sessionId da URL (ex: /api/carrinho?sessionId=uuid-123)
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ itens: [] });
    }

    const carrinho = await prisma.carrinho.findUnique({
      where: {
        sessionId: sessionId,
      },
      include: {
        itens: {
          include: {
            doce: true,
          },
        },
      },
    });

    return NextResponse.json(carrinho || { itens: [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar carrinho" },
      { status: 500 },
    );
  }
}
