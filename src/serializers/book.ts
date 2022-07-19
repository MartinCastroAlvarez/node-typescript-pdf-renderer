// ----------------------------------------------------------------
// Purpose:
// This library implements the Book serializers.
// ----------------------------------------------------------------

import { SerializedAuthor } from './author'
import { Serializable } from './base'
import { SerializedChapter } from './chapter'
import { SerializedText } from './text'

export interface SerializedBook extends Serializable {
    title: SerializedText
    subtitle: SerializedText
    chapters: Array<SerializedChapter>
    authors: Array<SerializedAuthor>
    foreword: Array<Serializable>
    afterword: Array<Serializable>
    acknowledgements: Array<Serializable>
    legal: Array<Serializable>
    prologue: Array<Serializable>
}
