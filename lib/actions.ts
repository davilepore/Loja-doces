"use client";

import { getSessionId } from "@/lib/cartSession";

export interface CartConfig {
  massa?: string;
  recheio?: string;
  tamanho?: string;
}

export async function addToCart(
  doceId: number,
  quantidade: number,
  configuracoes: CartConfig = {},
) {
  const sessionId = getSessionId();

  if (!sessionId) throw new Error("Session ID não encontrado");

  return await fetch("/api/carrinho", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      doceId,
      quantidade,
      configuracoes,
    }),
  });
}
