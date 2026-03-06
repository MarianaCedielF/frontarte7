// Define la forma de un actor que viene del backend (ya existe). 
// El export significa que otros archivos pueden importar y usar esta interface. 
export interface Movie {
    id: string;
    title: string;
    poster: string;
    duration: string;
    country: string;
    releaseDate: string;
    popularity: number;
}

// Define la forma de los datos del formulario. 
// Es casi igual a Actor pero sin id porque cuando el usuario llena el formulario para crear un actor nuevo, el id todavía no existe. El backend genera automáticamente el id cuando se guarda el actor.
// En este caso se trata de los datos que el usuario está escribiendo. Es decir, de un actor que aún no existe.
export interface MovieFormData {
  title: string;
    poster: string;
    duration: string;
    country: string;
    releaseDate: string;
    popularity: number;
}