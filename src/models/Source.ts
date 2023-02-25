// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Source class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedSource } from '../serializers/Source'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Image } from './Image'
import { Person } from './Person'
import { Text } from './Text'


export class Source implements Model {
    public readonly title: Text = new Text()
    public readonly link: Text = new Text()
    public authors: Array<Person> = new Array<Person>()
    public readonly avatar: Image = new Image()
    private year: number

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

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
        Log.info('Preprocessing Source', this)
        await Promise.all(this.authors.map(async x => await x.build()))
        await this.avatar.build()
        await this.link.build()
        await this.title.build()
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedSource {
        return {
            "Type": (this as any).constructor.name,
            "Authors": this.authors?.map(person => person.serialise()),
            "Title": this.title.serialise(),
            "Link": this.link.serialise(),
            "Avatar": this.avatar.serialise(),
            "Year": this.getYear(),
        }
    }
    public deserialise(data: SerializedSource): void {
        if (data) {
            Log.info('Unserialising Source', data)
            this.avatar.deserialise(data.Avatar)
            this.title.deserialise(data.Title)
            this.setYear(data.Year)
            this.link.deserialise(data.Link)
            this.authors = data.Authors?.map(x => {
                let person: Person = new Person()
                person.deserialise(x)
                return person
            }) || []
        }
    }
}
