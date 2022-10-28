// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Person class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedPerson } from '../serializers/Person'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Image } from './Image'
import { Text } from './Text'


export class Person implements Model {
    public readonly name: Text = new Text()
    public readonly website: Text = new Text()
    public readonly bio: Text = new Text()
    public readonly email: Text = new Text()
    public readonly avatar: Image = new Image()

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.name.get()}>`
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
        await this.name.build()
        await this.website.build()
        await this.email.build()
        await this.bio.build()
        await this.avatar.build()
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedPerson {
        return {
            "Type": (this as any).constructor.name,
            "Name": this.name.serialise(),
            "Website": this.website.serialise(),
            "Bio": this.bio.serialise(),
            "Email": this.email.serialise(),
            "Avatar": this.avatar.serialise(),
        }
    }
    public deserialise(data: SerializedPerson): void {
        if (data) {
            Log.info('Unserialising Person', data)
            this.name.deserialise(data.Name)
            this.website.deserialise(data.Website)
            this.bio.deserialise(data.Bio)
            this.email.deserialise(data.Email)
            this.avatar.deserialise(data.Avatar)
        }
    }
}
