// src/app/page.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main style={{ padding: '64px 32px', textAlign: 'center' }}>
      <h1 className="text-4xl font-bold text-white" style={{ marginBottom: '12px' }}>{t.appName}</h1>
      <p style={{ color: 'rgb(156, 163, 175)', marginBottom: '48px' }}>Sistema de gestión de actores y películas</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        <Link
          href="/actors"
          style={{ backgroundColor: 'rgb(55, 65, 81)', color: 'white', fontWeight: 'bold', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '1rem' }}
        >
          {t.viewActors}
        </Link>

        <Link
          href="/movies"
          style={{ backgroundColor: 'rgb(55, 65, 81)', color: 'white', fontWeight: 'bold', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '1rem' }}
        >
          {t.viewMovies}
        </Link>
      </div>
    </main>
  );
}