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
}