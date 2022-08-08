// ----------------------------------------------------------------
// Purpose:
// This library implements the List interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedText } from './Text'

export interface SerializedList extends Serialized {
    Items?: Array<SerializedText>
}
