"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, toggleLanguage } = useLanguage();

  return (
    <nav style={{ backgroundColor: 'rgb(17, 24, 39)', borderBottom: '1px solid rgb(75, 85, 99)', padding: '12px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Link href="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
          {t.appName}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          <Link
            href="/actors"
            style={{ backgroundColor: 'rgb(55, 65, 81)', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
          >
            {t.actors}
          </Link>

          <Link
            href="/movies"
            style={{ backgroundColor: 'rgb(55, 65, 81)', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
          >
            {t.movies}
          </Link>

          <button
            onClick={toggleLanguage}
            style={{ backgroundColor: 'rgb(37, 99, 235)', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}
          >
            {t.language}
          </button>

        </div>
      </div>
    </nav>
  );
}