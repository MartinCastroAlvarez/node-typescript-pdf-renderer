// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote class.
// ----------------------------------------------------------------

import { SerializedQuote } from '../serializers/quote'

import { Author } from './author'
import { Model } from './base'
import { Text } from './text'

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
