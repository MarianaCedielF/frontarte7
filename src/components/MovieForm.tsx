"use client";

import { useState } from "react";
import { MovieFormData } from "@/types/movie";

interface MovieFormProps {
  onSubmit: (data: MovieFormData) => void;
  defaultValues?: MovieFormData;
  isSubmitting: boolean;
}

export default function MovieForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: MovieFormProps) {

  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [poster, setPoster] = useState(defaultValues?.poster ?? "");
  const [duration, setDuration] = useState(defaultValues?.duration ?? "");
  const [country, setCountry] = useState(defaultValues?.country ?? "");
  const [releaseDate, setReleaseDate] = useState(defaultValues?.releaseDate ?? "");
  const [popularity, setPopularity] = useState(defaultValues?.popularity ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({ title, poster, duration, country, releaseDate, popularity });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Título
        </label>
        <input
          id="title"
          type="text"
          
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="poster" className="block font-medium mb-1">
          URL del poster
        </label>
        <input
          id="poster"
          type="text"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block font-medium mb-1">
          Duración
        </label>
        <input
          id="duration"
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="country" className="block font-medium mb-1">
          Pais
        </label>
        <input
          id="country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="releaseDate" className="block font-medium mb-1">
          Fecha de lanzamiento
        </label>
        <input
          id="releaseDate"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="popularity" className="block font-medium mb-1">
          Popularidad
        </label>
        <input
          id="popularity"
          type="number"
          value={popularity}
          onChange={(e) => setPopularity(Number(e.target.value))}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>

    </form>
  );
}