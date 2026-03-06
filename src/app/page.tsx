// Esta línea se utiliza para importar el componente Link de Next.js que permite navegar entre las páginas sin tener que refrescar la página completa sino solamente las cosas que han sido cambiadas, modificadas, etc.
import Link from "next/link";

// Define el componente de la página de inicio. El export default es obligatorio para que Next.js identifique cuál es el componente que debe renderizar.
export default function Home() {
  return (
    // El main es el contenedor principal de la página. Le damos clases de Tailwind para centrar el contenido y darle padding.
    <main className="container mx-auto p-8 text-center">
      {/* Título y texto con clases de Tailwind. */}
      <h1 className="text-4xl font-bold mb-4">BackArte7</h1>
      <p className="text-gray-600 mb-8">Sistema de gestión de actores</p>
      {/* Botón para ir a la lista de actores. Es un Link de Next.js que apunta a la ruta /actors. Se ve como un botón porque le aplicamos clases de Tailwind. */}
      <Link
        href="/actors"
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700"
      >
        Ver Lista de Actores
      </Link>
      <br></br>
      <Link
        href="/movies"
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700"
      >
        Ver Lista de Películas
      </Link>
    </main>
  );
}