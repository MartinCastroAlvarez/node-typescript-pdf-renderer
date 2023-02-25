// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Brand class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedBrand } from '../serializers/Brand'

import { Model } from '../interfaces/Model'

import { Tree } from '../utils/Tree'

import { Log } from '../utils/Logging'

import { Text } from './Text'
import { Image } from './Image'
import { Person } from './Person'

import { FileNotFoundError } from '../errors/Tree'

export class Brand implements Model {
    public readonly title: Text = new Text()
    public readonly icon: Text = new Text()
    public readonly avatar: Image = new Image()
    public authors: Array<Person> = new Array<Person>()

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
        Log.info('Preprocessing Brand', this)
        await this.title.build()
        await this.icon.build()
        await this.avatar.build()
        await Promise.all(this.authors.map(async x => await x.build()))
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedBrand {
        return {
            "Type": (this as any).constructor.name,
            "Authors": this.authors?.map(person => person.serialise()),
            "Avatar": this.avatar.serialise(),
            "Icon": this.icon.serialise(),
            "Title": this.title.serialise(),
        }
    }
    public deserialise(data: SerializedBrand): void {
        if (data) {
            Log.info('Unserialising Brand', data)
            this.icon.deserialise(data.Icon)
            this.title.deserialise(data.Title)
            this.avatar.deserialise(data.Avatar)
            this.authors = data.Authors?.map(x => {
                let person = new Person()
                person.deserialise(x)
                return person
            }) || []
        }
    }
}
