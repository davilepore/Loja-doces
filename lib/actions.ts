"use client";

import { getSessionId } from "@/lib/cartSession";

// Definimos a interface para acabar com o erro de "any"
export interface BoloConfigs {
  massa: string;
  recheio: string;
  tamanho: string;
}

export async function addToCart(
  doceId: number,
  quantidade: number,
  configuracoes: BoloConfigs,
) {
  const sessionId = getSessionId();

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
