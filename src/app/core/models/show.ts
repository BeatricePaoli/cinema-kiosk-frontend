import { Movie } from "./movie";
import { Seat, TheaterScreen } from "./theater";
import { ProjectionType } from "./tickets";

export interface ShowFilter {
    movieId: number;
    city: string;
    theaterId: number;
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
    seatsTaken: Seat[];
}