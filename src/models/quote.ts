// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote class.
// ----------------------------------------------------------------

import { Author, SerializedAuthor } from './author'
import { Model } from './base'
import { Block } from './block'
import { Model } from './base'
import { Text, SerializedText } from './text'

interface SerializedQuote extends SerializedText {
    author: SerializedAuthor
}

export class Quote extends Text implements Block, Model {
    public readonly TYPE: string = 'Quote'
    public author: Author

    // Lazy constructor.
    constructor() {
        this.text = new Text()
        this.author = new Author()
    }

    // JSON serializers.
    toJson() : SerializedQuote {
        data: SerializedQuote = <SerializedQuote>super().toJson()
        data.author = this.author.toJson()
        return data
    }
    fromJson(data: SerializedQuote) : void {
        super().fromJson(data)
        if (data.type != this.TYPE)
            throw new Error(`Serialization type missmatch: {data}`)
        this.author.fromJson(data.author)
    }
}
