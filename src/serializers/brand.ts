// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand interface.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedImage } from './image'
import { Author } from './author'

export interface SerializedBrand extends Serialized {
    Title: string
    Logo: SerializedImage
    Authors: Array<SerilaizedAuthor>
}
