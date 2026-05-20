"use client";
import { Frown, Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getSessionId } from "@/lib/cartSession";
import { useCarrinho } from "@/app/contexts/CarrinhoContext";

type ItemCarrinho = {
  id: number;
  quantidade: number;
  configuracoes: {
    massa: string;
    recheio: string;
    tamanho: string;
  };
  doce: {
    id: number;
    nome: string;
    imagemUrl: string;
    categoria: string;
  };
};

type Props = {
  close: () => void;
};

function Cart({ close }: Props) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [loading, setLoading] = useState(true);
  const { refetchCarrinho } = useCarrinho();

  useEffect(() => {
    async function loadCart() {
      const sessionId = getSessionId();

      try {
        const res = await fetch(`/api/carrinho?sessionId=${sessionId}`);
        const data = await res.json();

        setItens(data?.itens || []);
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  const message = itens
    .map((item, index) => {
      const linhas = [
        `${index + 1}. ${item.doce.nome.toUpperCase()} x${item.quantidade}`,
        item.doce.categoria === "BOLOS" && item.configuracoes.massa
          ? `   🍰 Massa: ${item.configuracoes.massa}`
          : null,
        item.configuracoes.recheio
          ? `   🍫 Recheio: ${item.configuracoes.recheio}`
          : null,
        item.configuracoes.tamanho
          ? `   ✨ Cobertura: ${item.configuracoes.tamanho}`
          : null,
      ].filter(Boolean);

      return linhas.join("\n");
    })
    .join("\n\n");

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

  const mensagemFinal = [
    "Olá! 🍬 Gostaria de fazer um pedido:",
    "━━━━━━━━━━━━━━━━━━━━",
    message,
    "━━━━━━━━━━━━━━━━━━━━",
    `🛍️ Total: ${totalItens} ${totalItens === 1 ? "item" : "itens"}`,
    "",
    "Poderia me confirmar a disponibilidade? 😊",
  ].join("\n");

  const handleSubmit = (message: string) => {
    const url = `https://wa.me/+5521972505271?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const aumentarQuantidade = async (id: number) => {
    const item = itens.find((i) => i.id === id)!;
    const novaQtd = item.quantidade + 1;

    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade: novaQtd } : i)),
    );

    await fetch(`/api/carrinho/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantidade: novaQtd }),
    });

    refetchCarrinho();
  };

  const diminuirQuantidade = async (id: number) => {
    const item = itens.find((i) => i.id === id)!;
    const novaQtd = item.quantidade - 1;

    setItens((prev) =>
      novaQtd <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantidade: novaQtd } : i)),
    );

    await fetch(`/api/carrinho/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantidade: novaQtd }),
    });

    refetchCarrinho();
  };

  const removerItem = async (id: number) => {
    setItens((prev) => prev.filter((i) => i.id !== id));

    await fetch(`/api/carrinho/${id}`, { method: "DELETE" });

    refetchCarrinho();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 flex justify-end">
        <div
          className="absolute inset-0 bg-[#44201F]/40 backdrop-blur-sm"
          onClick={close}
        />
        <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#7dd0c2]/20 border-t-[#7dd0c2] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-[#44201F]/40 backdrop-blur-sm transition-opacity"
        onClick={close}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#7dd0c2]" size={24} />
            <h2 className="text-xl font-black text-[#44201F] uppercase tracking-tighter">
              Sua Sacola
            </h2>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="text-[#44201F]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {itens.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <Frown size={40} className="text-gray-300" />
              </div>
              <p className="text-[#44201F]/60 font-medium">
                Seu carrinho está vazio
              </p>
              <button
                onClick={close}
                className="text-[#7dd0c2] font-bold text-sm uppercase tracking-widest hover:underline"
              >
                Voltar às compras
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {itens.map((item) => (
                <div
                  className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  key={item.id}
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.doce.imagemUrl}
                      alt={item.doce.nome}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[#44201F] font-bold truncate capitalize">
                      {item.doce.nome.toLowerCase()}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => diminuirQuantidade(item.id)}
                          className="p-1 hover:bg-gray-50 text-[#44201F] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-[#44201F]">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => aumentarQuantidade(item.id)}
                          className="p-1 hover:bg-gray-50 text-[#44201F] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removerItem(item.id)}
                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {itens.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[#44201F]/60 font-medium">
                Total de itens:
              </span>
              <span className="text-xl font-black text-[#44201F]">
                {itens.reduce((acc, item) => acc + item.quantidade, 0)}
              </span>
            </div>

            <button
              onClick={() => handleSubmit(mensagemFinal)}
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 transition-all active:scale-95"
            >
              Finalizar pelo WhatsApp
              <FaWhatsapp size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
