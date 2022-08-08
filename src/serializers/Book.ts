// ----------------------------------------------------------------
// Purpose:
// This library implements the Book serializers.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedChapter } from './Chapter'
import { SerializedPerson } from './Person'
import { SerializedText } from './Text'
import { SerializedTopic } from './Topic'

export interface SerializedBook extends Serialized {
    Title?: SerializedText
    Subtitle?: SerializedText
    Chapters?: Array<SerializedChapter>
    Authors?: Array<SerializedPerson>
    Foreword?: Array<SerializedText>
    Afterword?: Array<SerializedText>
    Acknowledgements?: Array<SerializedText>
    Legal?: Array<SerializedText>
    Topics?: Array<SerializedTopic>
}
