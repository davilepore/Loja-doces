"use client";

import { useState } from "react";
import { addToCart, CartConfig } from "@/lib/actions";

type Props = {
  doceId: number;
};

function FormBolos({ doceId }: Props) {
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);

    const formData = new FormData(e.currentTarget);

    const configs: CartConfig = {
      massa: String(formData.get("massa")),
      recheio: String(formData.get("recheio")),
      tamanho: String(formData.get("tamanho")),
    };

    try {
      const res = await addToCart(doceId, 1, configs);

      if (res.ok) {
        setMensagem("Bolo adicionado ao carrinho!");
      } else {
        setMensagem("Erro ao adicionar o bolo");
      }
    } catch (error) {
      setMensagem("Erro de conexão com o servidor");
    } finally {
      setCarregando(false);
      setTimeout(() => setMensagem(""), 2000);
    }
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 border rounded-xl bg-white shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="massa"
              className="text-sm font-semibold text-gray-700"
            >
              Massa:
            </label>
            <select
              className="border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-black/10"
              name="massa"
              id="massa"
              required
            >
              <option value="amanteigada">Amanteigada</option>
              <option value="chocolate">Chocolate</option>
              <option value="mesclada">Mesclada</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="recheio"
              className="text-sm font-semibold text-gray-700"
            >
              Recheio:
            </label>
            <select
              className="border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-black/10"
              name="recheio"
              id="recheio"
              required
            >
              <option value="brigadeiro">Brigadeiro</option>
              <option value="limao">Limão</option>
              <option value="pacoca">Paçoca</option>
              <option value="churos">Churros</option>
              <option value="branco">Brigadeiro Branco</option>
              <option value="beijinho">Beijinho</option>
              <option value="nozes">Nozes</option>
              <option value="ninho">Ninho</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="tamanho"
              className="text-sm font-semibold text-gray-700"
            >
              Tamanho:
            </label>
            <select
              className="border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-black/10"
              name="tamanho"
              id="tamanho"
              required
            >
              <option value="15cm">15cm - 12 a 15 fatias</option>
              <option value="20cm">20cm - 22 a 25 fatias</option>
              <option value="25cm">25cm - 42 a 45 fatias</option>
              <option value="30cm">30cm - 60 fatias</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className={`w-full bg-black text-white py-3 rounded-lg font-bold transition-all mt-2 ${
              carregando
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800 active:scale-[0.98]"
            }`}
          >
            {carregando ? "Adicionando..." : "Adicionar ao Carrinho"}
          </button>
        </form>
      </div>

      {mensagem && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-xl shadow-2xl z-50 text-white font-bold animate-in fade-in zoom-in duration-300 ${
            mensagem.includes("Erro") ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {mensagem}
        </div>
      )}
    </>
  );
}

export default FormBolos;
