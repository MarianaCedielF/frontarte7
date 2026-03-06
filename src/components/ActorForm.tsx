// El formulario se usa en dos lugares: entonces en vez de escribir el mismo formulario dos veces, lo creamos una vez como componente y lo reutilizamos.

// "use client" es obligatoria cuando un componente usa useState o maneja eventos como onClick.
// En Next.js con App Router, por defecto todos los componentes se ejecutan en el servidor. Al escribir "use client" le decimos a Next.js: "este componente necesita ejecutarse en el navegador del usuario".
"use client";

// useState; el hook de React para manejar estado. Lo importamos de "react"
import { useState } from "react";
// Importamos el tipo ActorFormData para definir el tipo de los datos que manejaremos en el formulario.
import { ActorFormData } from "@/types/actor";

// Definimos las props que este componente recibe de su padre
interface ActorFormProps {
  // onSubmit: ecibe los datos del formulario y no devuelve nada. El padre decide qué hacer con esos datos (si crear o actualizar).
  onSubmit: (data: ActorFormData) => void;
  // defaultValues?: es opcional. Solo se pasa cuando editamos un actor para prellenar el formulario. Cuando creamos, no se pasa y el formulario queda vacío.
  defaultValues?: ActorFormData;
  // isSubmitting: el padre nos avisa si está procesando el envío para deshabilitar el botón
  isSubmitting: boolean;
}

export default function ActorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: ActorFormProps) {

  // Se maneja el estado de cada campo con useState.
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
  // El handleSubmit
  // e.preventDefault(): evita que el navegador recargue la página al enviar el formulario, que es el comportamiento por defecto del HTML.
  // onSubmit(): llama a la función que nos pasó el padre con todos los datos del formulario. El padre decide qué hacer: si es creación llama a createActor(), si es edición llama a updateActor()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({ name, photo, nationality, birthDate, biography });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

      {/* Los campos del formulario */}
      {/* value={name}: conecta el input con el estado. Lo que el usuario ve en el input viene del estado. */}
      {/* onChange={(e) => setName(e.target.value)}: cada vez que el usuario escribe algo, actualiza el estado con el nuevo valor. e.target.value es el texto que hay en el input en ese momento */}

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