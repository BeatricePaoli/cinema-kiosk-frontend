import { SafeUrl } from "@angular/platform-browser";

export interface MovieFilter {
    movie?: string;
    city?: string;
    cinema?: string;
}

export interface MovieSearchResponse {
    current: Movie[],
    future: Movie[],
}

export interface Movie {
    id: number;
    name: string;
    img: string | SafeUrl;
    releaseDate: Date;
    durationMins: number;
    score: number;
    genres: string[];
    description: string;
    actors: Actor[];
}

export interface Actor {
    name: string;
    img: string | SafeUrl;
}