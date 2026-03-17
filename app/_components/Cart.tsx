"use client";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type ItemCarrinho = {
  id: number;
  quantidade: number;
  doce: {
    id: number;
    nome: string;
    imagemUrl: string;
  };
};
type Props = {
  close: () => void;
};

function Cart({ close }: Props) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      const res = await fetch("/api/carrinho");
      const data = await res.json();
      setItens(data?.itens || []);
      setLoading(false);
    }

    loadCart();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/40" />
        <div className="space-y-3 relative flex items-center justify-center w-96 bg-white h-full shadow-xl p-6">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" />
      <div className="space-y-3 relative w-96 bg-white h-full shadow-xl p-6">
        <button onClick={close}>
          <X />
        </button>
        <h2 className="text-center text-2xl">Seus Itens</h2>
        <div className="flex flex-col space-y-3">
          {itens.map((item) => (
            <div
              className="flex items-center justify-center border gap-2 p-3"
              key={item.id}
            >
              <Image
                src={item.doce.imagemUrl}
                alt={item.doce.nome}
                width={50}
                height={50}
              />
              <p>{item.doce.nome}</p>
              <div className="flex items-center gap-3">
                <button className="w-6 h-6 flex items-center justify-center border rounded">
                  <Minus size={14} />
                </button>

                <span className="w-6 text-center">{item.quantidade}</span>

                <button className="w-6 h-6 flex items-center justify-center border rounded">
                  <Plus size={14} />
                </button>
                <button>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-30">
          <button className="flex items-center justify-center gap-2 w-[50%] bg-green-500 p-3 rounded-xl">
            Finalizar compra <FaWhatsapp />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
