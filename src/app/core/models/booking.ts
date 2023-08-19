import { Movie } from "./movie";
import { Seat, Theater } from "./theater";

export interface Booking {
    id: number;
    city: string;
    theater: Theater;
    movie: Movie;
    seats: Seat[];
    showId: number;
    date: Date;
    startTime: string;
    price: number;
    codeUrl: string;
    status: BookingStatus;
}

export enum BookingStatus {
    CREATED = "CREATED",
    PAID = "PAID",
    CHECKEDIN = "CHECKEDIN",
    CANCELED = "CANCELED",
}