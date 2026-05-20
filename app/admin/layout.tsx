"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/doces", label: "Doces", icon: "🍬" },
  { href: "/admin/eventos", label: "Eventos", icon: "🎉" },
  { href: "/admin/configuracoes", label: "Configurações", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <aside
        style={{
          width: 240,
          background: "#1a1118",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: "28px 24px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#f9c5d1",
              letterSpacing: "-0.5px",
            }}
          >
            🍭 Doceria
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              marginTop: 2,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Painel Admin
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  marginBottom: 4,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#f9c5d1" : "rgba(255,255,255,0.55)",
                  background: active ? "rgba(249,197,209,0.1)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 16 }}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all 0.15s",
            }}
          >
            🚪 Sair
          </button>
        </div>
      </aside>

      <main
        style={{
          marginLeft: 240,
          flex: 1,
          background: "#faf7f5",
          minHeight: "100vh",
          padding: "0",
        }}
      >
        {children}
      </main>
    </div>
  );
}
