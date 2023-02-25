// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Edition model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedEdition } from '../serializers/Edition'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Text } from './Text'

export class Edition implements Model {
    private number: number
    private year: number
    public readonly description: Text = new Text()

    // Number getter and setter.
    public getNumber(): number { return this.number }
    public setNumber(n: number) { this.number = n }

    // Year getter and setter.
    public getYear(): number { return this.year }
    public setYear(y: number) { this.year = y }

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
        Log.info('Preprocessing Edition', this)
        await this.description.build()
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedEdition {
        return {
            "Type": (this as any).constructor.name,
            "Number": this.getNumber(),
            "Year": this.getYear(),
            "Description": this.description.serialise(),
        }
    }
    public deserialise(data: SerializedEdition): void {
        if (data) {
            Log.info('Unserialising Edition', data)
            this.description.deserialise(data.Description)
            this.setNumber(data.Number)
            this.setYear(data.Year)
        }
    }
}
