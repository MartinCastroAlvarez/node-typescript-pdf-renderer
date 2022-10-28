// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Chapter class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedChapter } from '../serializers/Chapter'

import { Language } from '../enums/Language'

import { NumberedModel } from '../interfaces/Model'

import { Source } from './Source'
import { Story } from './Story'
import { Text } from './Text'
import { Topic } from './Topic'

import { Log } from '../utils/Logging'
import { Yaml } from '../utils/Yaml'

export class Chapter implements NumberedModel {
    public readonly number: Text = new Text()
    public readonly title: Text = new Text()
    public readonly summary: Text = new Text()
    public stories: Array<Story> = new Array<Story>()

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // Number getter and setter.
    public getNumber(): string {
        return this.number.get(Language.ALL)
    }
    public setNumber(...numbers: Array<string>): void {
        this.number.set(Language.ALL, numbers.join('.'))
    }

    // Extracts Topics from Stories.
    public getTopics(): Array<Topic> {
        let set: Set<string> = new Set<string>()
        return this.stories.reduce(
            (accumulator, story) => accumulator.concat(story.topics),
            []
        ).filter(
            topic => !set.has(topic.title.get()) && set.add(topic.title.get())
        ) || []
    }

    // Extracts Sources from Stories.
    public getSources(): Array<Source> {
        let set: Set<string> = new Set<string>()
        return this.stories.reduce(
            (accumulator, story) => accumulator.concat(story.sources),
            []
        ).filter(
            source => source.title !== undefined && !set.has(source.title.get()) && set.add(source.title.get())
        ) || []
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
        Log.info('Preprocessing Chapter', this)
        await this.summary.build()
        await Promise.all(this.stories.map(async x => await x.build()))
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedChapter {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialise(),
            "Summary": this.summary.serialise(),
            "Topics": this.getTopics()?.map(topic => topic.serialise()) || [],
            "Stories": this.stories?.map(story => story.serialise()) || [],
        }
    }
    public deserialise(data: SerializedChapter): void {
        if (data) {
            Log.info('Unserialising Chapter', data)
            this.title.deserialise(data.Title) 
            this.summary.deserialise(data.Summary) 
            this.stories = data.Stories?.map((x, index) => <Story>Yaml.deserialise(x))
        }
    }
}
