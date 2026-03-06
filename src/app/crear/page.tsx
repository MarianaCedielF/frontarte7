"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ActorForm from "@/components/ActorForm";
import { createActor } from "@/services/actorService";
import { ActorFormData } from "@/types/actor";

export default function CrearActorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: ActorFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createActor(data);
      router.push("/actors");
    } catch (err) {
      setError("Error al crear el actor. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <Link
        href="/actors"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Volver a la lista
      </Link>

      <h1 className="text-3xl font-bold mb-6">Crear Actor</h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <ActorForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}