// El formulario se usa en dos lugares: entonces en vez de escribir el mismo formulario dos veces, lo creamos una vez como componente y lo reutilizamos.

// "use client" es obligatoria cuando un componente usa useState o maneja eventos como onClick.
// En Next.js con App Router, por defecto todos los componentes se ejecutan en el servidor. Al escribir "use client" le decimos a Next.js: "este componente necesita ejecutarse en el navegador del usuario".
"use client";

import { useState } from "react";
import { ActorFormData } from "@/types/actor";

// Definimos las props que este componente recibe de su padre
interface ActorFormProps {
  onSubmit: (data: ActorFormData) => void;

  defaultValues?: ActorFormData;

  isSubmitting: boolean;
}

export default function ActorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: ActorFormProps) {

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [photo, setPhoto] = useState(defaultValues?.photo ?? "");
  const [nationality, setNationality] = useState(
    defaultValues?.nationality ?? ""
  );
  const [birthDate, setBirthDate] = useState(
    defaultValues?.birthDate?.slice(0, 10) ?? ""
  );
  const [biography, setBiography] = useState(
    defaultValues?.biography ?? ""
  );

  // Cuando se hace clock en Guardar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({ name, photo, nationality, birthDate, biography });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="photo" className="block font-medium mb-1">
          URL de la Foto
        </label>
        <input
          id="photo"
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="nationality" className="block font-medium mb-1">
          Nacionalidad
        </label>
        <input
          id="nationality"
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="block font-medium mb-1">
          Fecha de Nacimiento
        </label>
        <input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="biography" className="block font-medium mb-1">
          Biografía
        </label>
        <textarea
          id="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          required
          rows={4}
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