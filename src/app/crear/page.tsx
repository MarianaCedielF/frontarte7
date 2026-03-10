// src/app/crear/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ActorForm from "@/components/ActorForm";
import { createActor } from "@/services/actorService";
import { ActorFormData } from "@/types/actor";
import { useLanguage } from "@/context/LanguageContext";

export default function CrearActorPage() {
  const { t } = useLanguage();
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
      setError(t.errorCreate);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="text-3xl font-bold text-white">{t.createActorTitle}</h1>
        <Link
          href="/actors"
          style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontWeight: 'bold', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}
        >
          {t.backToList}
        </Link>
      </div>

      {error && (
        <p className="text-red-400 mb-4">{error}</p>
      )}

      <ActorForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}