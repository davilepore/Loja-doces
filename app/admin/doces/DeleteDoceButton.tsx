// app/admin/doces/DeleteDoceButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function DeleteDoceButton({
  id,
  nome,
}: {
  id: number;
  nome: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Remover "${nome}"? Esta ação não pode ser desfeita.`)) return;

    await fetch(`/api/admin/doces/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "7px 14px",
        borderRadius: 8,
        background: "#fff0f0",
        color: "#cc3333",
        border: "none",
        fontSize: 13,
        cursor: "pointer",
        fontWeight: 500,
      }}
    >
      🗑️ Remover
    </button>
  );
}
