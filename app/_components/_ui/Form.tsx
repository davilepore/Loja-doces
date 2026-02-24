"use client";

import { useState } from "react";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
};

export default function ContatoForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4 border-2 border-amber-950 rounded-2xl shadow-md"
    >
      <div>
        <label className="block mb-1 font-medium">Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full border border-amber-950 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-amber-950 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full border border-amber-950 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Mensagem</label>
        <textarea
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border border-amber-950 rounded-lg px-3 py-2 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-950 text-white py-2 rounded-lg"
      >
        Enviar
      </button>
    </form>
  );
}
