"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getSessionId } from "@/lib/cartSession";

type CarrinhoContextType = {
  totalItens: number;
  refetchCarrinho: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType>({
  totalItens: 0,
  refetchCarrinho: () => {},
});

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [totalItens, setTotalItens] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchTotal() {
      const sessionId = getSessionId();
      const res = await fetch(`/api/carrinho?sessionId=${sessionId}`);
      const data = await res.json();
      if (!cancelled)
        setTotalItens(
          data.itens?.reduce(
            (acc: number, item: { quantidade: number }) =>
              acc + item.quantidade,
            0,
          ) ?? 0,
        );
    }

    fetchTotal();

    return () => {
      cancelled = true;
    };
  }, []);

  const refetchCarrinho = useCallback(async () => {
    const sessionId = getSessionId();
    const res = await fetch(`/api/carrinho?sessionId=${sessionId}`);
    const data = await res.json();
    setTotalItens(
      data.itens?.reduce(
        (acc: number, item: { quantidade: number }) => acc + item.quantidade,
        0,
      ) ?? 0,
    );
  }, []);

  return (
    <CarrinhoContext.Provider value={{ totalItens, refetchCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
export const useCarrinho = () => useContext(CarrinhoContext);
