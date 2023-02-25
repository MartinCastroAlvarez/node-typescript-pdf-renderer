// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Quote model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedQuote } from '../serializers/Quote'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Person } from './Person'
import { Text } from './Text'

export class Quote implements Model {
    public readonly author: Person = new Person()
    public readonly text: Text = new Text()

    // ----------------------------------------------------------------
    // PREPROCESSING STEP:
    // Preprocessing simply refers to perform series of operations to
    // transform or change data and cache the results before actually
    // using them. That includes:
    // - Data Cleaning.
    // - Dimensionality Reduction.
    // - Feature Engineering.
    // - Sampling Data.
    // - Data Transformation.
    // - Imbalanced Data.
    // ----------------------------------------------------------------
    public async build(): Promise<void> {
        Log.info('Preprocessing Quote', this)
        await this.author.build()
        await this.text.build()
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedQuote {
        return {
            "Type": (this as any).constructor.name,
            "Author": this.author.serialise(),
            "Text": this.text.serialise(),
        }
    }
    public deserialise(data: SerializedQuote): void {
        if (data) {
            Log.info('Unserialising Quote', data)
            this.author.deserialise(data.Author)
            this.text.deserialise(data.Text)
        }
    }
}
