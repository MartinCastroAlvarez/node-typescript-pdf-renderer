// ----------------------------------------------------------------
// PURPOSE:
// This library implements Context errors.
// ----------------------------------------------------------------

export class ContextError extends Error {}

export class BookContextError extends ContextError {}

export class LanguageContextError extends ContextError {}

export class ProductContextError extends ContextError {}

export class SectionContextError extends ContextError {}
