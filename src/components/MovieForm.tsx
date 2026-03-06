// El formulario se usa en dos lugares: entonces en vez de escribir el mismo formulario dos veces, lo creamos una vez como componente y lo reutilizamos.

// "use client" es obligatoria cuando un componente usa useState o maneja eventos como onClick.
// En Next.js con App Router, por defecto todos los componentes se ejecutan en el servidor. Al escribir "use client" le decimos a Next.js: "este componente necesita ejecutarse en el navegador del usuario".
"use client";

// useState; el hook de React para manejar estado. Lo importamos de "react"
import { useState } from "react";
// Importamos el tipo ActorFormData para definir el tipo de los datos que manejaremos en el formulario.
import { MovieFormData } from "@/types/movie";

// Definimos las props que este componente recibe de su padre
interface MovieFormProps {
  // onSubmit: ecibe los datos del formulario y no devuelve nada. El padre decide qué hacer con esos datos (si crear o actualizar).
  onSubmit: (data: MovieFormData) => void;
  // defaultValues?: es opcional. Solo se pasa cuando editamos un actor para prellenar el formulario. Cuando creamos, no se pasa y el formulario queda vacío.
  defaultValues?: MovieFormData;
  // isSubmitting: el padre nos avisa si está procesando el envío para deshabilitar el botón
  isSubmitting: boolean;
}

export default function MovieForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: MovieFormProps) {

  // Se maneja el estado de cada campo con useState.
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [poster, setPoster] = useState(defaultValues?.poster ?? "");
  const [duration, setDuration] = useState(defaultValues?.duration ?? "");
  const [country, setCountry] = useState(defaultValues?.country ?? "");
  const [releaseDate, setReleaseDate] = useState(defaultValues?.releaseDate ?? "");
  const [popularity, setPopularity] = useState(defaultValues?.popularity ?? 0);

  // Cuando se hace clock en Guardar
  // El handleSubmit
  // e.preventDefault(): evita que el navegador recargue la página al enviar el formulario, que es el comportamiento por defecto del HTML.
  // onSubmit(): llama a la función que nos pasó el padre con todos los datos del formulario. El padre decide qué hacer: si es creación llama a createActor(), si es edición llama a updateActor()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({ title, poster, duration, country, releaseDate, popularity });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

      {/* Los campos del formulario */}
      {/* value={name}: conecta el input con el estado. Lo que el usuario ve en el input viene del estado. */}
      {/* onChange={(e) => setName(e.target.value)}: cada vez que el usuario escribe algo, actualiza el estado con el nuevo valor. e.target.value es el texto que hay en el input en ese momento */}

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

      {/* Botón */}
      {/* disabled={isSubmitting}: deshabilita el botón mientras se procesa el envío, evitando que el usuario haga clic dos veces */}
      {/*{isSubmitting ? "Guardando..." : "Guardar"}: cambia el texto del botón según el estado. Si está procesando muestra "Guardando...", si no muestra "Guardar" */}

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