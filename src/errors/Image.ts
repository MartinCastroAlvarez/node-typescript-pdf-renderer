// ----------------------------------------------------------------
// Purpose:
// This library implements Image errors.
// ----------------------------------------------------------------

export class ImageError extends Error {}

export class InvalidImageHeightError extends ImageError {}

export class InvalidImageWidthError extends ImageError {}

export class InvalidImageLeftError extends ImageError {}

export class InvalidImageRightError extends ImageError {}

export class InvalidImageTopError extends ImageError {}

export class InvalidImageBottomError extends ImageError {}
