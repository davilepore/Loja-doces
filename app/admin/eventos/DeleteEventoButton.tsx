"use client";
import { useRouter } from "next/navigation";

export default function DeleteEventoButton({
  id,
  titulo,
}: {
  id: number;
  titulo: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Remover "${titulo}"? Os itens também serão excluídos.`))
      return;
    await fetch(`/api/admin/eventos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 rounded-lg bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition"
    >
      🗑️ Remover
    </button>
  );
}
