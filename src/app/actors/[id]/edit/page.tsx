// src/app/actors/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ActorForm from "@/components/ActorForm";
import { getActorById, updateActor } from "@/services/actorService";
import { Actor, ActorFormData } from "@/types/actor";
import { useLanguage } from "@/context/LanguageContext";

export default function EditActorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [actorId, setActorId] = useState<string | null>(null);
  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      setActorId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!actorId) return;

    const loadActor = async () => {
      try {
        const data = await getActorById(actorId);
        setActor(data);
      } catch (err) {
        setError(t.actorNotFound);
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
      setError(t.errorUpdate);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-gray-400">{t.loadingActor}</p>
      </main>
    );
  }

  if (error || !actor) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-red-400">{error || t.actorNotFound}</p>
        <Link
          href="/actors"
          className="text-blue-400 hover:text-blue-300 mt-4 inline-block transition-colors"
        >
          {t.backToList}
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <Link
        href="/actors"
        className="text-blue-400 hover:text-blue-300 mb-4 inline-block transition-colors"
      >
        {t.backToList}
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-white">
        {t.editActorTitle}: {actor.name}
      </h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

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