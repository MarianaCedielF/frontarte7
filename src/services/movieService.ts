import { Movie, MovieFormData } from "@/types/movie";

const API_URL = "http://localhost:3000/api/v1";

export async function getMovies(): Promise<Movie[]> {
    const response = await fetch(`${API_URL}/movies`);

    if (!response.ok) {
        throw new Error("Error al obtener las películas");
    }

    return response.json() as Promise<Movie[]>;
}

export async function getMovieById(id: string): Promise<Movie> {
    const response = await fetch(`${API_URL}/movies/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la película");
    }

    return response.json() as Promise<Movie>;
}

export async function createMovie(data: MovieFormData): Promise<Movie> {
    const response = await fetch(`${API_URL}/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al crear la película");
    }

    return response.json() as Promise<Movie>;
}

export async function updateMovie(
    id: string,
    data: MovieFormData
): Promise<Movie> {
    const response = await fetch(`${API_URL}/movies/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la película");
    }

    return response.json() as Promise<Movie>;
}

export async function deleteMovie(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/movies/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la película");
    }
}