// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Api interface.
//
// BUILDER DESIGN PATTERN:
// Builder is a creational design pattern that lets you construct
// complex objects step by step. The pattern allows you to produce
// different types and representations of an object using the same
// construction code.
// ----------------------------------------------------------------

export interface Api {
    toString(): string
    flush(stream: object)
    render(path: string)
}
