export interface MovieFilter {
    movie?: string;
    city?: string;
    theaterId?: number;
}

export interface MovieSearchResponse {
    current: Movie[],
    future: Movie[],
}

export interface Movie {
    id: number;
    name: string;
    img: string;
    releaseDate: Date;
    durationMins: number;
    score: number;
    genres: string[];
    description: string;
    actors: Actor[];
}

export interface Actor {
    name: string;
    img: string;
}