// El archivo que permite hacer la conexión con el backend.

// Importamos las 2 interfaces que creamos en el archivo src/types/actor.ts para usar los tipos de datos que definimos ahí.
import { Actor, ActorFormData } from "@/types/actor";

// La URL base del backend.
const API_URL = "http://localhost:3000/api/v1";

// Obtener todos los actores
// Función asíncrona, tarda un tiempo en completarse porque espera la respuesta del backend.
export async function getActors(): Promise<Actor[]> {
    // hace una petición HTTP GET al backend. Por defecto fetch siempre hace GET.
    // Await pausa la función hasta que el backend responde.
    const response = await fetch(`${API_URL}/actors`);

    // response.ok: es true si el backend respondió con éxito.
    if (!response.ok) {
        throw new Error("Error al obtener los actores");
    }

    // response.json(): convierte la respuesta de texto JSON a un objeto JavaScript.
    // Promise<Actor[]>: la función devuelve una promesa que resolverá en un array de actores.
    return response.json() as Promise<Actor[]>;
}

// Obtener un actor por su ID
// Igual que getActors() pero agrega el id al final de la URL para pedir un solo actor.
export async function getActorById(id: string): Promise<Actor> {
    const response = await fetch(`${API_URL}/actors/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el actor");
    }

    return response.json() as Promise<Actor>;
}

// Crear un actor nuevo
export async function createActor(data: ActorFormData): Promise<Actor> {
    const response = await fetch(`${API_URL}/actors`, {
        // method: "POST": le dice al backend que queremos crear algo nuevo.
        method: "POST",
        // headers: "Content-Type": "application/json" le dice al backend que le estamos enviando datos en formato JSON.
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(data): convierte el objeto JavaScript a texto JSON para que el backend lo pueda recibir.
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al crear el actor");
    }

    return response.json() as Promise<Actor>;
}

// Actualizar un actor existente
// Igual que createActor() pero usa method: "PUT" y agrega el id en la URL. PUT le dice al backend que quiero reemplazar los datos de un actor existente.
export async function updateActor(
    id: string,
    data: ActorFormData
): Promise<Actor> {
    const response = await fetch(`${API_URL}/actors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el actor");
    }

    return response.json() as Promise<Actor>;
}

// Eliminar un actor por su ID
// Promise<void>: esta función no devuelve nada porque el backend solo confirma la eliminación.
export async function deleteActor(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/actors/${id}`, {
        // method: "DELETE": le dice al backend que queremos eliminar el actor con ese id.
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el actor");
    }
}