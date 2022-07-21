// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand interface.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedImage } from './image'
import { SerializedPerson } from './person'

export interface SerializedBrand extends Serialized {
    Title: string
    Logo: SerializedImage
    Authors: Array<SerializedPerson>
}
