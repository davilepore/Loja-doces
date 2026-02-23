"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ESQUERDA */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-pink-400">
            <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
          </div>

          {/* Textos esquerda (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <span className="flex justify-center w-20 text-sm font-medium text-gray-700 hover:text-pink-500 cursor-pointer">
              Sobre
            </span>
            <span className="flex justify-center w-20 text-sm font-medium text-gray-700 hover:text-pink-500 cursor-pointer">
              Produtos
            </span>
          </div>
        </div>

        {/* CENTRO */}
        <div className="flex items-center gap-6">
          {/* Separator */}
          <div className="hidden md:block h-6 w-px bg-gray-300" />

          {/* Nome */}
          <div className="text-xl md:text-2xl font-bold text-pink-500 flex flex-col items-center leading-5">
            <span>Doces</span>
            <span>Mabecky</span>
          </div>

          {/* Separator */}
          <div className="hidden md:block h-6 w-px bg-gray-300" />
        </div>

        {/* DIREITA */}
        <div className="flex items-center gap-6">
          {/* Textos direita (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <span className="flex justify-center w-20 text-sm font-medium text-gray-700 hover:text-pink-500 cursor-pointer">
              Contato
            </span>
            <span className="flex justify-center w-20 text-sm font-medium text-gray-700 hover:text-pink-500 cursor-pointer">
              Carrinho
            </span>
          </div>

          {/* Busca Desktop */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-8 pr-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <Search
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Menu Mobile */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-4 text-center">
          <span className="block hover:text-pink-500 cursor-pointer">
            Sobre
          </span>
          <span className="block hover:text-pink-500 cursor-pointer">
            Produtos
          </span>
          <span className="block hover:text-pink-500 cursor-pointer">
            Contato
          </span>
          <span className="block hover:text-pink-500 cursor-pointer">
            Carrinho
          </span>

          <div className="relative pt-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-8 pr-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <Search
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
