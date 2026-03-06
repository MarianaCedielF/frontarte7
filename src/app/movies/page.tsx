// "use client": obligatorio porque usamos useState y useEffect.
"use client";

// useState, useEffect: los dos hooks fundamentales de React.
import { useState, useEffect } from "react";
// Link: componente de navegación de Next.js
import Link from "next/link";
// Actor: la interface para tipar el array de actores.
import { Movie } from "@/types/movie";
// getActors, deleteActor → las funciones del servicio.
import { getMovies, deleteMovie } from "@/services/movieService";

export default function MoviesPage() {
  // actors: guarda el array de actores que viene del backend. Empieza vacío [].
  const [movies, setMovies] = useState<Movie[]>([]);

  // loading: indica si estamos esperando la respuesta del backend. Empieza en true porque al cargar la página inmediatamente pedimos los datos.
  const [loading, setLoading] = useState<boolean>(true);

  // error: guarda un mensaje de error si algo falla. Empieza en null porque no hay error al inicio. El tipo string | null significa que puede ser texto o null
  const [error, setError] = useState<string | null>(null);

  // async: necesario porque getActors() es asíncrona.
  const loadMovies = async () => {
    // try: intentamos ejecutar el código. Si algo falla, saltamos al catch.
    try {
      // setLoading(true): se activa el indicador de carga.
      setLoading(true);
      // setError(null): limpiamos errores anteriores.
      setError(null);
      // await getActors(): espera la respuesta del backend.
      const data = await getMovies();
      // setActors(data): guarda los actores en el estado.
      setMovies(data);
      // catch: si algo falla, guardamos el mensaje de error en el estado
    } catch (err) {
      setError("No se pudieron cargar las peliculas. Verifica que el backend esté corriendo.");
      // finally: siempre se ejecuta, haya error o no. se usa para desactivar el indicador de carga.
    } finally {
      setLoading(false);
    }
  };

  // useEffect con el array vacío [] se ejecuta una sola vez cuando el componente aparece en pantalla por primera vez.
  useEffect(() => {
    loadMovies();
  }, []);

  // Eliminar un actor
  const handleDelete = async (id: string, name: string) => {
    // window.confirm(): muestra un diálogo de confirmación al usuario antes de eliminar. Si el usuario cancela, confirmed es false y salimos con return
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar ${name}?`
    );
    if (!confirmed) return;

    try {
      // await deleteActor(id): llama al servicio para eliminar en el backen.
      await deleteMovie(id);
      // actors.filter((actor) => actor.id !== id): JavaScript. Fikter crea un nuevo array con todos los actores excepto el que tiene el id que eliminamos. Así se actualiza la lista sin llamar a la API de nuevo.
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (err) {
      alert("Error al eliminar la película. Intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <p className="text-gray-500">Cargando peliculas...</p>
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
        <h1 className="text-3xl font-bold">Peliculas</h1>
        <Link
          href="/crear"
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          + Crear Película
        </Link>
      </div>

      {movies.length === 0 && (
        <p className="text-gray-500">No hay películas registradas aún.</p>
      )}      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4 shadow-sm">

            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover rounded mb-3"
            />

            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p className="text-gray-600">{movie.duration}</p>
            <p className="text-gray-600">{movie.country}</p>
            <p className="text-gray-600 text-sm">
              {movie.releaseDate.slice(0, 10)}
            </p>
            <p className="text-gray-600 mt-2 text-sm">{movie.popularity}</p>

            <div className="flex gap-2 mt-4">
              <Link
                href={`/movies/${movie.id}/edit`}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 text-sm"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(movie.id, movie.title)}
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