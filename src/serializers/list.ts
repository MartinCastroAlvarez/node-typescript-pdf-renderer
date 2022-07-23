// ----------------------------------------------------------------
// Purpose:
// This library implements the List interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedText } from './text'

export interface SerializedList extends Serialized {
    Items?: Array<SerializedText>
}
