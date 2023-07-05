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
    id: string;
    name: string;
    img: string;
    releaseDate: Date;
    duration: number;
    score: number;
    genres: string[];
    plot: string;
    cast: Actor[];
}

export interface Actor {
    name: string;
    img: string;
}