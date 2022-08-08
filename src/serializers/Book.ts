// ----------------------------------------------------------------
// Purpose:
// This library implements the Book serializers.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedPerson } from './Person'
import { SerializedChapter } from './Chapter'
import { SerializedTopic } from './Topic'
import { SerializedText } from './Text'

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
