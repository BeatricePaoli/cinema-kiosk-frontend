import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MultipleValidator {

    static atLeastOneRequired(...fields: string[]): ValidatorFn {
      return (fcontrol: AbstractControl): ValidationErrors | null => {
        const fg = fcontrol as FormGroup;
        return fields.some(fieldName => {
            return this.isFieldEmpty(fieldName, fg);
        })
          ? null
          : ({ atLeastOneRequired: true } as ValidationErrors);
      };
    }

    private static isFieldEmpty(fieldName: string, fg: FormGroup) {
        if (!fg.get(fieldName)) { return false; }
        const field = fg.get(fieldName)!.value;
        if (typeof field === 'number') { return field && field > 0 ? true : false; }
        if (typeof field === 'string') { return field && field.length > 0 ? true : false; }
        return field !== null && field !== undefined;
    };
}