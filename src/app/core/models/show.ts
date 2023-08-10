import { Movie } from "./movie";
import { TheaterScreen } from "./theater";
import { ProjectionType } from "./tickets";

export interface ShowFilter {
    movieId: number;
    city: string;
    cinema: string;
    getBookedSeats: boolean;
}

export interface Show {
    id: number;
    date: Date;
    startTime: string;
    language: string;
    projectionType: ProjectionType;
    screen: TheaterScreen;
    movie: Movie;
}