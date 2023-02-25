// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Book class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedBook } from '../serializers/Book'

import { Model } from '../interfaces/Model'

import { Chapter } from './Chapter'
import { Person } from './Person'
import { Edition } from './Edition'
import { Source } from './Source'
import { Text } from './Text'
import { Topic } from './Topic'

import { Log } from '../utils/Logging'
import { Yaml } from '../utils/Yaml'

export class Book implements Model {
    public chapters: Array<Chapter> = new Array<Chapter>()
    public authors: Array<Person> = new Array<Person>()
    public foreword: Array<Model> = new Array<Model>()
    public prerequisites: Array<Model> = new Array<Model>()
    public goal: Array<Model> = new Array<Model>()
    public audience: Array<Model> = new Array<Model>()
    public afterword: Array<Model> = new Array<Model>()
    public editions: Array<Edition> = new Array<Edition>()
    public acknowledgements: Array<Text> = new Array<Text>()
    public readonly title: Text = new Text()
    public readonly subtitle: Text = new Text()

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // Extracts topics from Chapters.
    public getTopics(): Array<Topic> {
        let set: Set<string> = new Set<string>()
        return this.chapters.reduce(
            (accumulator, chapter) => accumulator.concat(chapter.getTopics()),
            []
        ).filter(
            topic => !set.has(topic.title.get()) && set.add(topic.title.get())
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
        Log.info('Preprocessing Book', this)
        await Promise.all(this.chapters.map(async x => await x.build()))
        await Promise.all(this.authors.map(async x => await x.build()))
        await Promise.all(this.foreword.map(async x => await x.build()))
        await Promise.all(this.afterword.map(async x => await x.build()))
        await Promise.all(this.acknowledgements.map(async x => await x.build()))
        await Promise.all(this.editions.map(async x => await x.build()))
        await Promise.all(this.audience.map(async x => await x.build()))
        await Promise.all(this.goal.map(async x => await x.build()))
        await Promise.all(this.prerequisites.map(async x => await x.build()))
        await this.title.build()
        await this.subtitle.build()
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedBook {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialise(),
            "Subtitle": this.title.serialise(),
            "Topics": this.getTopics()?.map(topic => topic.serialise()),
            "Chapters": this.chapters?.map(chapter => chapter.serialise()),
            "Authors": this.authors?.map(person => person.serialise()),
            "Editions": this.editions?.map(block => block.serialise()),
            "Goal": this.goal?.map(block => block.serialise()),
            "Prerequisites": this.prerequisites?.map(block => block.serialise()),
            "Audience": this.audience?.map(block => block.serialise()),
            "Foreword": this.foreword?.map(block => block.serialise()),
            "Afterword": this.afterword?.map(block => block.serialise()),
            "Acknowledgements": this.acknowledgements?.map(block => block.serialise()),
        }
    }
    public deserialise(data: SerializedBook): void {
        if (data) {
            Log.info('Unserialising Book', data)
            this.title.deserialise(data.Title)
            this.subtitle.deserialise(data.Subtitle)
            this.goal = data.Goal?.map(x => <Text>Yaml.deserialise(x)) || []
            this.prerequisites = data.Prerequisites?.map(x => <Text>Yaml.deserialise(x)) || []
            this.audience = data.Audience?.map(x => <Text>Yaml.deserialise(x)) || []
            this.foreword = data.Foreword?.map(x => <Text>Yaml.deserialise(x)) || []
            this.afterword = data.Afterword?.map(x => <Text>Yaml.deserialise(x)) || []
            this.acknowledgements = data.Acknowledgements?.map(x => <Text>Yaml.deserialise(x)) || []
            this.editions = data.Editions?.map(x => <Edition>Yaml.deserialise(x)) || []
            this.authors = data.Authors?.map(x => <Person>Yaml.deserialise(x)) || []
            this.chapters = data.Chapters?.map(x => <Chapter>Yaml.deserialise(x)) || []
            this.enumerate()
        }
    }

    // ----------------------------------------------------------------
    // Method responsible for enumerating the chapters and stories in
    // this Book and enforcing consistency in the enumeration.
    // ----------------------------------------------------------------
    private enumerate(): void {
        Log.info('Enumerating book', this)
        this.chapters.forEach((chapter, index) => {
            const chapterNumber: number = index + 1
            chapter.setNumber(chapterNumber.toString())
            chapter.stories.forEach((story, index2) => {
                const storyNumber: number = index2 + 1
                story.setNumber(chapter.getNumber(), storyNumber.toString())
            })
        })
    }
}
