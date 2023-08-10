import { Room } from "./room";
import { TicketType } from "./tickets";

export interface TheaterFilter {
    cities: CityFilter[];
}

export interface CityFilter {
    name: string;
    theaters: string[];
}

export interface Theater {
    id: number;
    name: string;
    address: Address;
    screens: TheaterScreen[];
    ticketTypes: TicketType[];
}

export interface Address {
    id: number;
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