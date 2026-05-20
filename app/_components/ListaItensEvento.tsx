"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, Check, ImageOff } from "lucide-react";
import { getSessionId } from "@/lib/cartSession";
import { useCarrinho } from "../contexts/CarrinhoContext";

type EventoItem = {
  id: number;
  nome: string;
  quantidade: number;
  descricao?: string | null;
  preco?: number | null;
  imagemUrl?: string | null;
};

type Props = {
  itens: EventoItem[];
};

type ItemState = {
  quantidade: number;
  adicionado: boolean;
  loading: boolean;
};

export default function ListaItensEvento({ itens }: Props) {
  const { refetchCarrinho } = useCarrinho();
  const [estados, setEstados] = useState<Record<number, ItemState>>(
    Object.fromEntries(
      itens.map((item) => [
        item.id,
        { quantidade: 1, adicionado: false, loading: false },
      ]),
    ),
  );

  const atualizar = (id: number, patch: Partial<ItemState>) =>
    setEstados((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const addToCart = async (item: EventoItem) => {
    const estado = estados[item.id];
    atualizar(item.id, { loading: true });

    try {
      const sessionId = getSessionId();
      await fetch("/api/carrinho/evento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          eventoItemId: item.id,
          quantidade: estado.quantidade,
        }),
      });
      refetchCarrinho();

      atualizar(item.id, { adicionado: true, loading: false });

      setTimeout(() => atualizar(item.id, { adicionado: false }), 2000);
    } catch {
      atualizar(item.id, { loading: false });
    }
  };

  if (itens.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#7dd0c2]/15 p-2.5 rounded-xl">
          <ShoppingBag size={18} className="text-[#44201F]" />
        </div>
        <p className="text-[10px] font-black text-[#7dd0c2] uppercase tracking-widest">
          Itens disponíveis
        </p>
        <span className="ml-auto bg-[#44201F] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
          {itens.length}
        </span>
      </div>

      <div className="space-y-3">
        {itens.map((item) => {
          const estado = estados[item.id];
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#44201f]/5 shadow-sm overflow-hidden flex gap-0"
            >
              <div className="relative w-24 shrink-0 bg-[#44201f]/5">
                {item.imagemUrl ? (
                  <Image
                    src={item.imagemUrl}
                    alt={item.nome}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageOff size={20} className="text-[#44201f]/20" />
                  </div>
                )}
              </div>

              <div className="flex-1 p-4 flex flex-col justify-between gap-2">
                <div>
                  <h3 className="text-[#44201F] font-bold text-sm leading-tight capitalize">
                    {item.nome.toLowerCase()}
                  </h3>
                  {item.descricao && (
                    <p className="text-[#44201f]/50 text-xs mt-0.5 leading-snug line-clamp-2">
                      {item.descricao}
                    </p>
                  )}
                  {item.preco && (
                    <p className="text-[#7dd0c2] font-black text-sm mt-1">
                      R$ {item.preco.toFixed(2).replace(".", ",")}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-[#44201f]/5 rounded-xl p-1">
                    <button
                      onClick={() =>
                        atualizar(item.id, {
                          quantidade: Math.max(1, estado.quantidade - 1),
                        })
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white transition-all active:scale-90"
                    >
                      <Minus size={12} className="text-[#44201F]" />
                    </button>
                    <span className="text-[#44201F] font-black text-sm w-5 text-center">
                      {estado.quantidade}
                    </span>
                    <button
                      onClick={() =>
                        atualizar(item.id, {
                          quantidade: Math.min(
                            item.quantidade,
                            estado.quantidade + 1,
                          ),
                        })
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white transition-all active:scale-90"
                      disabled={estado.quantidade >= item.quantidade}
                    >
                      <Plus size={12} className="text-[#44201F]" />
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    disabled={estado.loading || estado.adicionado}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all active:scale-95
                      ${
                        estado.adicionado
                          ? "bg-[#7dd0c2] text-[#44201F]"
                          : "bg-[#44201F] hover:bg-[#5a3332] text-white"
                      }`}
                  >
                    {estado.adicionado ? (
                      <>
                        <Check size={13} />
                        Adicionado
                      </>
                    ) : estado.loading ? (
                      <span className="opacity-60">...</span>
                    ) : (
                      <>
                        <Plus
                          size={13}
                          className={
                            estado.adicionado
                              ? "text-[#44201F]"
                              : "text-[#7dd0c2]"
                          }
                        />
                        Adicionar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
