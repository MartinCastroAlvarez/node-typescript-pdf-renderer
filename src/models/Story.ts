// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Story class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedStory } from '../serializers/Story'

import { Language } from '../enums/Language'

import { Model, NumberedModel } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Yaml } from '../utils/Yaml'
import { Source } from './Source'
import { Text } from './Text'
import { Topic } from './Topic'

export class Story implements NumberedModel {
    public readonly title: Text = new Text()
    public readonly number: Text = new Text()
    public sources: Array<Source> = new Array<Source>()
    public items: Array<Model> = new Array<Model>()
    public topics: Array<Topic> = new Array<Topic>()

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // Number getter and setter.
    public getNumber(): string { return this.number.get(Language.ALL) }
    public setNumber(...numbers: Array<string>): void {
        this.number.set(Language.ALL, numbers.join('.'))
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
        Log.info('Preprocessing Story', this)
        await this.title.build()
        await Promise.all(this.topics.map(async x => await x.build()))
        await Promise.all(this.sources.map(async x => await x.build()))
        await Promise.all(this.items.map(async x => await x.build()))
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedStory {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialise(),
            "Items": this.items?.map(item => item.serialise()),
            "Topics": this.topics?.map(topic => topic.serialise()),
            "Sources": this.sources?.map(source => source.serialise()),
        }
    }
    public deserialise(data: SerializedStory): void {
        if (data) {
            Log.info('Unserialising Story', data)
            this.title.deserialise(data.Title) 
            this.items = data.Items?.map(item => Yaml.deserialise(item)) || []
            this.topics = data.Topics?.map(topic => <Topic>Yaml.deserialise(topic)) || []
            this.sources = data.Sources?.map(source => <Source>Yaml.deserialise(source)) || []
        }
    }
}
