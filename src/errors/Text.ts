// ----------------------------------------------------------------
// Purpose:
// This library implements Text errors.
// ----------------------------------------------------------------

export class TextError extends Error {}

export class EmptynessError extends TextError {}

export class TranslationError extends TextError {}
