import { X } from "lucide-react";

type Props = {
  close: () => void;
};

function Cart({ close }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-96 bg-white h-full shadow-xl p-6">
        <button onClick={close}>
          <X />
        </button>
        <h2>Carrinho</h2>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Cart;
