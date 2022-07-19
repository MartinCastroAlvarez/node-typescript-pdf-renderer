// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote class.
// ----------------------------------------------------------------

import { Author, SerializedAuthor } from './author'
import { Model } from './base'
import { Text, SerializedText } from './text'

export interface SerializedQuote extends SerializedText {
    author: SerializedAuthor
}

export class Quote extends Text implements Model {
    public readonly author: Author

    // Lazy constructor.
    constructor() {
        super()
        this.author = new Author()
    }

    // JSON serializers.
    toJson() : SerializedQuote {
        let data: SerializedQuote = <SerializedQuote>super.toJson()
        data.author = this.author.toJson()
        return data
    }
    fromJson(data: SerializedQuote) : void {
        super.fromJson(data)
        this.author.fromJson(data.author)
    }
}
