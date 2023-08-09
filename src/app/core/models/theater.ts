import { Room } from "./room";

export interface TheaterFilter {
    cities: CityFilter[];
}

export interface CityFilter {
    name: string;
    theaters: string[];
}

export interface TheaterScreen extends Room {
    totalSeats: number;
}