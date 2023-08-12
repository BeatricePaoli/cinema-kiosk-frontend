import { AbstractControl } from "@angular/forms";
import { Observable, Subscription, map, startWith } from "rxjs";
import { AutocompleteTheaterFilter, TheaterFilter } from "../models/theater";

export function setupSearchFilters(filter: AutocompleteTheaterFilter, cinemaForm: AbstractControl<any>, 
    subs: Subscription[]): 
    {
        cities: string[],
        cinemas: TheaterFilter[],
        filteredCities: Observable<string[]>,
        filteredCinemas: Observable<TheaterFilter[]>,
    } {
    const cities = filter.cities.map(c => c.name);
    let cinemas: TheaterFilter[] = [];
    filter.cities.forEach(city => cinemas = cinemas.concat(city.theaters));

    const filteredCities = cinemaForm.get('city')!.valueChanges.pipe(
        startWith(''),
        map(value => autoCompletefilter(value || '', cities)),
    );

    const filteredCinemas = cinemaForm.get('cinema')!.valueChanges.pipe(
        startWith(''),
        map(value => autoCompletefilterCinema(value, cinemas)),
    );

    subs.push(cinemaForm.get('city')!.valueChanges.subscribe((value: string | null) => {
        const valid = filter.cities.find(c => c.name === value);
        cinemas = valid ? valid.theaters : [];

        // Trigger di valueChanges per aggiornare filteredCinemas
        cinemaForm.patchValue({
            cinema: cinemaForm.get('cinema')?.value
        });
    }));

    return {
        cities,
        cinemas,
        filteredCities,
        filteredCinemas,
    }
}

function autoCompletefilter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
}

function autoCompletefilterCinema(value: TheaterFilter, list: TheaterFilter[]): TheaterFilter[] {
    if (!value) return list;
    return list.filter(option => option.id === value.id);
}