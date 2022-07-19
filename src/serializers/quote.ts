// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote interface.
// ----------------------------------------------------------------

import { SerializedAuthor } from './author'
import { SerializedText } from './text'

export interface SerializedQuote extends SerializedText {
    author: SerializedAuthor
}
