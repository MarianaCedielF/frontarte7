"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { getMovies, deleteMovie } from "@/services/movieService";
import { useLanguage } from "@/context/LanguageContext";

export default function MoviesPage() {
  const { t } = useLanguage();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      setError(t.errorLoadingMovies);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`${t.confirmDeleteMovie} ${title}?`);
    if (!confirmed) return;
    try {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (err) {
      alert(t.errorDeleteMovie);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: '32px' }}>
        <p style={{ color: 'rgb(156, 163, 175)' }}>{t.loadingMovies}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: '32px' }}>
        <p style={{ color: 'rgb(239, 68, 68)' }}>{error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '32px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="text-3xl font-bold text-white">{t.movies}</h1>
        <Link
          href="/movies/crear" // no lo alcancé a hacer :(
          style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontWeight: 'bold', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}
        >
          {t.createMovie}
        </Link>
      </div>

      {movies.length === 0 && (
        <p style={{ color: 'rgb(156, 163, 175)' }}>{t.noMovies}</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg hover:border-gray-600 transition-colors"
          >
            <div style={{ height: '120px', overflow: 'hidden', borderRadius: '8px', marginBottom: '12px' }}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
              />
            </div>

            <h2 className="text-xl font-bold text-white">{movie.title}</h2>
            <p className="text-gray-400 text-sm">{t.duration}: {movie.duration}</p>
            <p className="text-gray-400 text-sm">{t.country}: {movie.country}</p>
            <p className="text-gray-400 text-sm">{t.releaseDate}: {movie.releaseDate.slice(0, 10)}</p>
            <p className="text-gray-400 text-sm">{t.popularity}: {movie.popularity}</p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <Link
                href={`/movies/${movie.id}/edit`} // no lo alcancé a hacer :(
                style={{ flex: 1, textAlign: 'center', backgroundColor: 'white', color: 'rgb(17, 24, 39)', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
              >
                {t.edit}
              </Link>
              <button
                onClick={() => handleDelete(movie.id, movie.title)}
                style={{ flex: 1, backgroundColor: 'rgb(185, 28, 28)', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}
              >
                {t.delete}
              </button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}