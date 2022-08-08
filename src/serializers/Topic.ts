// ----------------------------------------------------------------
// Purpose:
// This library implements the Topic interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedImage } from './Image'
import { SerializedText } from './Text'

export interface SerializedTopic extends Serialized {
    Title?: SerializedText
    Description?: SerializedText
    Avatar?: SerializedImage
}
