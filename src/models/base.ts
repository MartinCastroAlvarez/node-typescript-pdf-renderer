// ----------------------------------------------------------------
// Purpose:
// This library defines the Model interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

export interface Serializable {
    type: string
}

export interface Model {
    TYPE: string

    toJson() : Serializable
    toString() : string
    fromJson(data: Serializable) : void
}
