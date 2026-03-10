export interface Movie {
    id: string;
    title: string;
    poster: string;
    duration: string;
    country: string;
    releaseDate: string;
    popularity: number;
}

export interface MovieFormData {
  title: string;
    poster: string;
    duration: string;
    country: string;
    releaseDate: string;
    popularity: number;
}