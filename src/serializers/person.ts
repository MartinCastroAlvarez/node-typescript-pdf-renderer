// ----------------------------------------------------------------
// Purpose:
// This library implements the Person serializer.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedImage } from './image'

export interface SerializedPerson extends Serialized {
    Name?: string
    Website?: string
    Email?: string
    Logo?: SerializedImage
}