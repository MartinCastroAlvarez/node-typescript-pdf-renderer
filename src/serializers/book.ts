// ----------------------------------------------------------------
// Purpose:
// This library implements the Book serializers.
// ----------------------------------------------------------------

import { SerializedPerson } from './person'
import { Serialized } from './base'
import { SerializedChapter } from './chapter'
import { SerializedText } from './text'

export interface SerializedBook extends Serialized {
    Title: SerializedText
    Subtitle: SerializedText
    Chapters: Array<SerializedChapter>
    Authors: Array<SerializedPerson>
    Foreword: Array<Serialized>
    Afterword: Array<Serialized>
    Acknowledgements: Array<Serialized>
    Legal: Array<Serialized>
    Prologue: Array<Serialized>
}
