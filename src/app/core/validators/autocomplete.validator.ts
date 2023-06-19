import { ValidatorFn, AbstractControl } from "@angular/forms"

export class AutocompleteValidator {
    static validOption(validOptions: Array<string>): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (validOptions.indexOf(control.value) > -1) {
                return null;
            }
            return { validOption: { value: control.value } }
        }
    }
}