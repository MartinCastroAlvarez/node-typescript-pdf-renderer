// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote interface.
// ----------------------------------------------------------------

import { SerializedPerson } from './Person'
import { SerializedText } from './Text'

export interface SerializedQuote extends SerializedText {
    Author?: SerializedPerson
}
