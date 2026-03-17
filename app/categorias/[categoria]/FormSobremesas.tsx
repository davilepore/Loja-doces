"use client";

import { useState } from "react";
import { addToCart } from "@/lib/actions";

type Props = {
  doceId: number;
};

function FormSobremesas({ doceId }: Props) {
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);

    const formData = new FormData(e.currentTarget);
    const quantidade = Number(formData.get("quantidade"));

    try {
      const res = await addToCart(doceId, quantidade, {});

      if (res.ok) {
        setMensagem("Sobremesa adicionada!");
      } else {
        setMensagem("Erro ao adicionar sobremesa");
      }
    } catch (error) {
      setMensagem("Erro de conexão");
    } finally {
      setCarregando(false);
      setTimeout(() => setMensagem(""), 2000);
    }
  }

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="quantidade-sobremesa"
              className="text-sm font-medium text-gray-700"
            >
              Quantidade:
            </label>
            <input
              type="number"
              id="quantidade-sobremesa"
              name="quantidade"
              min="1"
              max="50"
              defaultValue="1"
              className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-black/10 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className={`w-full bg-black text-white py-2 rounded-lg font-medium transition-all ${
              carregando ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {carregando ? "Adicionando..." : "Adicionar Sobremesa"}
          </button>
        </form>
      </div>

      {mensagem && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-lg shadow-2xl z-50 text-white font-bold animate-in fade-in zoom-in duration-300 ${
            mensagem.includes("Erro") ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {mensagem}
        </div>
      )}
    </>
  );
}

export default FormSobremesas;
