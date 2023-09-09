import { Room } from "./room";
import { TicketType } from "./tickets";

export interface AutocompleteTheaterFilter {
    cities: CityFilter[];
}

export interface CityFilter {
    name: string;
    theaters: TheaterFilter[];
}

export interface TheaterFilter {
    id: number;
    name: string;
}

export interface Theater {
    id?: number;
    name: string;
    address: Address;
}

export interface Address {
    id?: number;
    number: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
}

export interface TheaterScreen extends Room {
    totalSeats: number;
    seatChart: Object;
}

export interface Seat {
    id: number;
    label: string;
}