// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Form class.
// ----------------------------------------------------------------

import { FormNullError, FormTypeError, FormValueError } from '../errors/Form'

export abstract class Form {
    // ----------------------------------------------------------------
    // Validating a string that can not be empty.
    // ----------------------------------------------------------------
    public static validateNonEmptyString(data: any): void {
        if (data === null) {
            throw new FormNullError('String is null: ${data}')
        }
        if (data === undefined) {
            throw new FormNullError('String is undefined: ${data}')
        }
        if (typeof data != 'string') {
            throw new FormTypeError('Not a string: ${data}')
        }
        if (!data) {
            throw new FormValueError('Empty string: ${data}')
        }
    }

    // ----------------------------------------------------------------
    // Validating a positive integer.
    // ----------------------------------------------------------------
    public static validatePositiveInteger(data: any): void {
        if (data === null) {
            throw new FormNullError('Integer is null: ${data}')
        }
        if (data === undefined) {
            throw new FormNullError('Integer is undefined: ${data}')
        }
        if (typeof data != 'number') {
            throw new FormTypeError('Not an integer: ${data}')
        }
        if (data < 0) {
            throw new FormValueError('Negative number: ${data}')
        }
    }
}
