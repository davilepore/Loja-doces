"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import Cart from "./Cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navLinkStyle =
    "text-sm font-bold text-[#44201F]/80 hover:text-[#7dd0c2] transition-colors cursor-pointer uppercase tracking-tight";

  return (
    <>
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#44201F]/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-8 flex-1">
            <span className={navLinkStyle}>Sobre Nós</span>
            <span className={navLinkStyle}>Doces</span>
          </div>

          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#7dd0c2] shadow-sm">
              <Image
                src="/logo.jpeg"
                alt="Logo Doces MaBecky"
                sizes="100%"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-xl md:text-2xl font-black text-[#44201F] tracking-tighter leading-none">
                DOCES <span className="text-[#7dd0c2]">MABECKY</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-end gap-6 flex-1">
            <div className="hidden md:flex items-center gap-8 mr-4">
              <span className={navLinkStyle}>Contato</span>
            </div>

            <div className="hidden lg:block relative group">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#7dd0c2]/50 w-40 focus:w-60 transition-all duration-300 outline-none text-[#44201F]"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#44201F]/40 group-focus-within:text-[#7dd0c2]"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-[#7dd0c2]/10 rounded-full transition-colors group"
              >
                <ShoppingCart
                  size={24}
                  className="text-[#44201F] group-hover:text-[#7dd0c2]"
                />
                <span className="absolute top-0 right-0 bg-[#7dd0c2] text-[#44201F] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  0
                </span>
              </button>

              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 text-[#44201F]"
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-6 space-y-6 text-center">
              <span className="text-lg font-bold text-[#44201F] hover:text-[#7dd0c2]">
                Sobre Nós
              </span>
              <span className="text-lg font-bold text-[#44201F] hover:text-[#7dd0c2]">
                Doces
              </span>
              <span className="text-lg font-bold text-[#44201F] hover:text-[#7dd0c2]">
                Contato
              </span>

              <div className="relative pt-2">
                <input
                  type="text"
                  placeholder="O que você procura?"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7dd0c2]"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 translate-y-0 text-gray-400"
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {cartOpen && <Cart close={() => setCartOpen(false)} />}
    </>
  );
}
