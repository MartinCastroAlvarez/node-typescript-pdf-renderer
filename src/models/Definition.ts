// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Definition model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedDefinition } from '../serializers/Definition'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Text } from './Text'

export class Definition implements Model {
    public readonly title: Text = new Text()
    public readonly description: Text = new Text()

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
        Log.info('Preprocessing Definition', this)
        await this.title.build()
        await this.description.build()
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedDefinition {
        return {
            "Type": (this as any).constructor.name,
            "Description": this.description.serialise(),
            "Title": this.title.serialise(),
        }
    }
    public deserialise(data: SerializedDefinition): void {
        if (data) {
            Log.info('Unserialising Definition', data)
            this.description.deserialise(data.Description)
            this.title.deserialise(data.Title)
        }
    }
}
