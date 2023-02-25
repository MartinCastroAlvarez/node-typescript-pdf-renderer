// ----------------------------------------------------------------
// PURPOSE:
// This library implements Form errors.
// ----------------------------------------------------------------

export class FormError extends Error {}

export class FormTypeError extends FormError {}
export class FormValueError extends FormError {}
export class FormNullError extends FormError {}
