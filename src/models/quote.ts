// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote class.
// ----------------------------------------------------------------

import { SerializedQuote } from '../serializers/quote'

import { Model } from '../interfaces/model'

import { Log } from '../logging'

import { Person } from './person'
import { Text } from './text'

export class Quote extends Text implements Model {
    public readonly author: Person

    // Lazy constructor.
    constructor() {
        super()
        this.author = new Person()
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
            Log.info('Loading Quote', data)
            this.author.unserialize(data['Author'])
        }
    }
}
