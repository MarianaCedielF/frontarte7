"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Actor } from "@/types/actor";
import { getActors, deleteActor } from "@/services/actorService";
import { useLanguage } from "@/context/LanguageContext";

export default function ActorsPage() {
  const { t } = useLanguage();
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadActors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getActors();
      setActors(data);
    } catch (err) {
      setError(t.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActors();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`${t.confirmDelete} ${name}?`);
    if (!confirmed) return;

    try {
      await deleteActor(id);
      setActors(actors.filter((actor) => actor.id !== id));
    } catch (err) {
      alert(t.errorDelete);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-gray-400">{t.loadingActors}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '32px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="text-3xl font-bold text-white">{t.actors}</h1>
        <Link
          href="/crear"
          style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontWeight: 'bold', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}
        >
          {t.createActor}
        </Link>
      </div>

      {actors.length === 0 && (
        <p className="text-gray-400">{t.noActors}</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {actors.map((actor) => (
          <div
            key={actor.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg hover:border-gray-600 transition-colors"
          >
            <div className="rounded mb-3 bg-gray-800" style={{ height: '120px', overflow: 'hidden' }}>
              <img
                src={actor.photo}
                alt={actor.name}
                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
              />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">{actor.name}</h2>
            <p className="text-gray-400 text-sm">
              <span className="text-gray-500 font-medium">{t.nationality}: </span>
              {actor.nationality}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              <span className="text-gray-500 font-medium">{t.birthDate}: </span>
              {actor.birthDate.slice(0, 10)}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              <span className="text-gray-500 font-medium">{t.biography}: </span>
              {actor.biography}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <Link
                href={`/actors/${actor.id}/edit`}
                style={{ flex: 1, textAlign: 'center', backgroundColor: 'white', color: 'rgb(17, 24, 39)', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
              >
                {t.edit}
              </Link>
              <button
                onClick={() => handleDelete(actor.id, actor.name)}
                style={{ flex: 1, textAlign: 'center', backgroundColor: 'rgb(185, 28, 28)', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}
              >
                {t.delete}
              </button>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}