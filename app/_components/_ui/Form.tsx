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

  const inputStyle = `
    w-full px-4 py-3 rounded-xl border border-gray-200 
    focus:border-[#7dd0c2] focus:ring-2 focus:ring-[#7dd0c2]/20 
    outline-none transition-all duration-200 bg-gray-50/50
    placeholder:text-gray-400 text-[#44201F]
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-bold text-[#44201F] ml-1">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Seu nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-[#44201F] ml-1">
            Telefone
          </label>
          <input
            type="tel"
            name="telefone"
            placeholder="(21) 99999-9999"
            value={formData.telefone}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-bold text-[#44201F] ml-1">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputStyle}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-bold text-[#44201F] ml-1">
          Mensagem
        </label>
        <textarea
          name="mensagem"
          placeholder="Como podemos te ajudar?"
          value={formData.mensagem}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputStyle} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#7dd0c2] hover:bg-[#6bc1b3] text-[#44201F] font-bold py-4 rounded-xl shadow-lg shadow-[#7dd0c2]/20 transition-all duration-300 active:scale-[0.98] mt-2"
      >
        Enviar Mensagem
      </button>
    </form>
  );
}
