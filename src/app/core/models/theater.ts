export interface TheaterFilter {
    cities: CityFilter[];
}

export interface CityFilter {
    name: string;
    theaters: string[];
}