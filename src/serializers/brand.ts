// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand interface.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedImage } from './image'

export interface SerializedBrand extends Serialized {
    Title: string
    Logo: SerializedImage
}
