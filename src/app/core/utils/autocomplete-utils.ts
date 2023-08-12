import { AbstractControl } from "@angular/forms";
import { Observable, Subscription, map, startWith } from "rxjs";
import { AutocompleteTheaterFilter, TheaterFilter } from "../models/theater";

export function setupSearchFilters(filter: AutocompleteTheaterFilter, theaterForm: AbstractControl<any>, 
    subs: Subscription[]): 
    {
        cities: string[],
        theaters: TheaterFilter[],
        filteredCities: Observable<string[]>,
        filteredTheaters: Observable<TheaterFilter[]>,
    } {
    const cities = filter.cities.map(c => c.name);
    let theaters: TheaterFilter[] = [];
    filter.cities.forEach(city => theaters = theaters.concat(city.theaters));

    const filteredCities = theaterForm.get('city')!.valueChanges.pipe(
        startWith(''),
        map(value => autoCompletefilter(value || '', cities)),
    );

    const filteredTheaters = theaterForm.get('theater')!.valueChanges.pipe(
        startWith(''),
        map(value => autoCompletefilterTheater(value, theaters)),
    );

    subs.push(theaterForm.get('city')!.valueChanges.subscribe((value: string | null) => {
        const valid = filter.cities.find(c => c.name === value);
        theaters = valid ? valid.theaters : [];

        // Trigger di valueChanges per aggiornare filteredTheaters
        theaterForm.patchValue({
            theater: theaterForm.get('theater')?.value
        });
    }));

    return {
        cities,
        theaters,
        filteredCities,
        filteredTheaters,
    }
}

function autoCompletefilter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
}

function autoCompletefilterTheater(value: TheaterFilter, list: TheaterFilter[]): TheaterFilter[] {
    if (!value) return list;
    return list.filter(option => option.id === value.id);
}