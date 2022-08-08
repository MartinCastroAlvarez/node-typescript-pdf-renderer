// ----------------------------------------------------------------
// Purpose:
// This library implements the Topic interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedText } from './Text'
import { SerializedImage } from './Image'

export interface SerializedTopic extends Serialized {
    Title?: SerializedText
    Description?: SerializedText
    Avatar?: SerializedImage
}
