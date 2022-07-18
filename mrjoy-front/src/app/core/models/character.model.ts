

interface Origin {
    name: string;
    url: string;
}

interface Location {
    name: string;
    url: string;
}
// Interfaz para tipar la respuesta de "obtenerPersonajeXId"
export interface CharacterResponse {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
}


