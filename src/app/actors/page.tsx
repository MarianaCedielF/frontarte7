"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Actor } from "@/types/actor";
import { getActors, deleteActor } from "@/services/actorService";

export default function ActorsPage() {
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
      setError("No se pudieron cargar los actores. Verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActors();
  }, []);

  // Eliminar un actor
  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar a ${name}?`
    );
    if (!confirmed) return;

    try {
      await deleteActor(id);
      setActors(actors.filter((actor) => actor.id !== id));
    } catch (err) {
      alert("Error al eliminar el actor. Intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-gray-500">Cargando actores...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Actores</h1>
        <Link
          href="/crear"
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          + Crear Actor
        </Link>
      </div>

      {actors.length === 0 && (
        <p className="text-gray-500">No hay actores registrados aún.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actors.map((actor) => (
          <div key={actor.id} className="border rounded-lg p-4 shadow-sm">

            <img
              src={actor.photo}
              alt={actor.name}
              className="w-full h-48 object-cover rounded mb-3"
            />

            <h2 className="text-xl font-bold">{actor.name}</h2>
            <p className="text-gray-600">{actor.nationality}</p>
            <p className="text-gray-500 text-sm">
              {actor.birthDate.slice(0, 10)}
            </p>
            <p className="text-gray-700 mt-2 text-sm">{actor.biography}</p>

            <div className="flex gap-2 mt-4">
              <Link
                href={`/actors/${actor.id}/edit`}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 text-sm"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(actor.id, actor.name)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm"
              >
                Eliminar
              </button>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}