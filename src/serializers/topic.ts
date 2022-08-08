// ----------------------------------------------------------------
// Purpose:
// This library implements the Topic interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedText } from './text'
import { SerializedImage } from './image'

export interface SerializedTopic extends Serialized {
    Title?: SerializedText
    Description?: SerializedText
    Avatar?: SerializedImage
}
