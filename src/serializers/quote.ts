// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote interface.
// ----------------------------------------------------------------

import { SerializedPerson } from './person'
import { SerializedText } from './text'

export interface SerializedQuote extends SerializedText {
    Author: SerializedPerson
}
