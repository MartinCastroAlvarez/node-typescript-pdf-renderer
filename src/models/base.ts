// ----------------------------------------------------------------
// Purpose:
// This library defines the Model interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

export interface Model {
    TYPE: string

    toJson() : Map<string, string>
    toString() : string
    fromJson(data: Map<string, any>) : void
}
