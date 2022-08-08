// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedImage } from './Image'
import { SerializedPerson } from './person'

export interface SerializedBrand extends Serialized {
    Title?: string
    Avatar?: SerializedImage
    Authors?: Array<SerializedPerson>
}
