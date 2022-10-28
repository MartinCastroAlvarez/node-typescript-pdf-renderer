// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Topic class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedTopic } from '../serializers/Topic'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Image } from './Image'
import { Text } from './Text'

export class Topic implements Model {
    public readonly title: Text = new Text()
    public readonly description: Text = new Text()
    public readonly avatar: Image = new Image()

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
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
        Log.info('Preprocessing Topic', this)
        await this.avatar.build()
        await this.description.build()
        await this.title.build()
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedTopic{
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialise(),
            "Description": this.description.serialise(),
            "Avatar": this.avatar.serialise(),
        }
    }
    public deserialise(data: SerializedTopic): void {
        if (data) {
            Log.info('Unserialising Topic', data)
            this.title.deserialise(data.Title)
            this.description.deserialise(data.Description)
            this.avatar.deserialise(data.Avatar)
        }
    }
}
