// ----------------------------------------------------------------
// Purpose:
// This library implements the Quote class.
// ----------------------------------------------------------------

import { SerializedQuote } from '../serializers/Quote'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Person } from './Person'
import { Text } from './Text'

export class Quote extends Text implements Model {
    public readonly author: Person = new Person()

    // JSON serializers.
   public serialize(): SerializedQuote {
        let data: SerializedQuote = <SerializedQuote>super.serialize()
        data['Author'] = this.author.serialize()
        return data
    }
    public unserialize(data: SerializedQuote): void {
        super.unserialize(data)
        if (data) {
            Log.info('Loading Quote', data)
            this.author.unserialize(data['Author'])
        }
    }
}
