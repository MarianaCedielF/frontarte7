// src/app/actors/[id]/edit/page.tsx

// En Next.js con App Router, por defecto todos los componentes se ejecutan en el servidor. El servidor no tiene acceso al navegador, entonces al escribir "use client" le decimos a Next.js donde debe ser ejecutado.
"use client";

// useState: el hook de React para manejar estado. Lo importamos de "react"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ActorForm from "@/components/ActorForm";
import { getActorById, updateActor } from "@/services/actorService";
import { Actor, ActorFormData } from "@/types/actor";

export default function EditActorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [actorId, setActorId] = useState<string | null>(null);
  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Primero resolvemos la promesa de params para obtener el id
  useEffect(() => {
    params.then((resolvedParams) => {
      setActorId(resolvedParams.id);
    });
  }, [params]);

  // Una vez que tenemos el id, cargamos el actor
  useEffect(() => {
    if (!actorId) return;

    const loadActor = async () => {
      try {
        const data = await getActorById(actorId);
        setActor(data);
      } catch (err) {
        setError("No se encontró el actor");
      } finally {
        setLoading(false);
      }
    };

    loadActor();
  }, [actorId]);

  const handleSubmit = async (data: ActorFormData) => {
    if (!actorId) return;
    setIsSubmitting(true);
    setError(null);

    try {
      await updateActor(actorId, data);
      router.push("/actors");
    } catch (err) {
      setError("Error al actualizar el actor. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-gray-500">Cargando datos del actor...</p>
      </main>
    );
  }

  if (error || !actor) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-red-500">{error || "Actor no encontrado"}</p>
        <Link
          href="/actors"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Volver a la lista
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">

      <Link
        href="/actors"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Volver a la lista
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        Editar Actor: {actor.name}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ActorForm
        onSubmit={handleSubmit}
        defaultValues={{
          name: actor.name,
          photo: actor.photo,
          nationality: actor.nationality,
          birthDate: actor.birthDate,
          biography: actor.biography,
        }}
        isSubmitting={isSubmitting}
      />

    </main>
  );
}