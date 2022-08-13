// ----------------------------------------------------------------
// Purpose:
// This library implements Geometry errors.
// ----------------------------------------------------------------

export class GeometryError extends Error {}

export class WidthException extends GeometryError {}
export class HeightException extends GeometryError {}
export class PositionException extends GeometryError {}
