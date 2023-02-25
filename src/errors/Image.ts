// ----------------------------------------------------------------
// PURPOSE:
// This library implements Image errors.
// ----------------------------------------------------------------

export class ImageError extends Error {}

export class ImageNotFoundError extends ImageError {}

export class InvalidImageHeightError extends ImageError {}

export class InvalidImageWidthError extends ImageError {}

export class InvalidImageLeftError extends ImageError {}

export class InvalidImageRightError extends ImageError {}

export class InvalidImageTopError extends ImageError {}

export class InvalidImageBottomError extends ImageError {}

export class ImageProcessingError extends ImageError {}

export class ImageOrientationError extends ImageError {}

export class ImageLevelError extends ImageError {}

export class ImageIntensityError extends ImageError {}

export class ImageRatioError extends ImageError {}
