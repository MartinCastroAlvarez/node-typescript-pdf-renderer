// ----------------------------------------------------------------
// PURPOSE:
// This library defines the List model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedList } from '../serializers/List'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Text } from './Text'

export class List implements Model {
    public items: Array<Text> = new Array<Text>()

    // List size getter.
    getSize(): number {
        return this.items.length
    }

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.getSize()}>`
    }

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
        Log.info('Preprocessing List', this)
        await Promise.all(this.items.map(async x => await x.build()))
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedList {
        return {
            "Type": (this as any).constructor.name,
            "Items": this.items?.map(item => item.serialise()),
        }
    }
    public deserialise(data: SerializedList): void {
        if (data) {
            Log.info('Unserialising List', data)
            this.items = data.Items?.map(item => {
                let text: Text = new Text()
                text.deserialise(item)
                return text
            }) || []
        }
    }
}
