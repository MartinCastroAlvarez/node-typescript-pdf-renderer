// ----------------------------------------------------------------
// Purpose:
// This library defines Product errors.
// ----------------------------------------------------------------

export class ProductError extends Error {}

export class InvalidLanguageError extends ProductError {}

export class RenderingError extends ProductError {}
