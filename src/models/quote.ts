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
    serialize(): SerializedQuote {
        let data: SerializedQuote = <SerializedQuote>super.serialize()
        data['Author'] = this.author.serialize()
        return data
    }
    unserialize(data: SerializedQuote): void {
        super.unserialize(data)
        if (data) {
            console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
            this.author.unserialize(data['Author'])
        }
    }
}
