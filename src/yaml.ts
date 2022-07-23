// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader adapter.
// ----------------------------------------------------------------

const yaml = require('js-yaml')

import { Tree } from './tree'
import { Reference } from './enums/reference'

import { Model } from './interfaces/model'
import { Serialized } from './interfaces/serialized'

import { Analogy } from './models/analogy'
import { Person } from './models/person'
import { Brand } from './models/brand'
import { Book } from './models/book'
import { Chapter } from './models/chapter'
import { Definition } from './models/definition'
import { Example } from './models/example'
import { Image } from './models/image'
import { File } from './models/file'
import { Joke } from './models/joke'
import { List } from './models/list'
import { Pallete } from './models/pallete'
import { Proverb } from './models/proverb'
import { Quote } from './models/quote'
import { Source } from './models/source'
import { Story } from './models/story'
import { Text } from './models/text'
import { Topic } from './models/topic'
import { Typeface } from './models/typeface'
import { Question } from './models/question'

// import { Challenge } from './models/challenge'
// import { Legend } from './models/legend'
// import { Conspiracy } from './models/conspiracy'
// import { Prophecy } from './models/prophecy'
// import { Exaggeration } from './models/exaggeration'
// import { Challenge } from './models/challenge'
// import { Tale } from './models/tale'
// import { Motivation } from './models/motivation'
// import { Surprise } from './models/surprise'
// import { Paper } from './models/paper'
// import { Quiz } from './models/quiz'
// import { Map } from './models/map'
// import { Table } from './models/table'
// import { Bar } from './models/bar'
// import { Pie } from './models/pie'
// import { Line } from './models/Line'
// import { Graph } from './models/graph'
// import { Math } from './models/math'
// import { Code } from './models/code'
// import { SocialAcceptance } from './models/code'
// import { TurningPoint } from './models/code'
// import { Cliffhanger } from './models/code'
// import { HumanScale } from './models/code'
// import { PersonalExperience } from './models/code'
// import { Benefit } from './models/code'
// import { Imagine } from './models/code'
// import { Authority } from './models/code'
// import { Challenge } from './models/code'
// import { Feelings } from './models/code'
// import { Childhood } from './models/code'
// import { Game } from './models/code'
// import { Urgent } from './models/code'
// import { TerrorTale } from './models/code'
// import { HeroicTale } from './models/code'
// import { EroticTale } from './models/code'
// import { Link } from './models/code'
// import { Post } from './models/code'
// import { Research } from './models/code'
// import { Study } from './models/code'
// import { Statistics } from './models/code'

import { SerializedAnalogy } from './serializers/analogy'
import { SerializedPerson } from './serializers/person'
import { SerializedBrand } from './serializers/brand'
import { SerializedBook } from './serializers/book'
import { SerializedChapter } from './serializers/chapter'
import { SerializedDefinition } from './serializers/definition'
import { SerializedExample } from './serializers/example'
import { SerializedImage } from './serializers/image'
import { SerializedFile } from './serializers/file'
import { SerializedJoke } from './serializers/joke'
import { SerializedList } from './serializers/list'
import { SerializedPallete } from './serializers/pallete'
import { SerializedProverb } from './serializers/proverb'
import { SerializedQuote } from './serializers/quote'
import { SerializedSource } from './serializers/source'
import { SerializedStory } from './serializers/story'
import { SerializedText } from './serializers/text'
import { SerializedTopic} from './serializers/topic'
import { SerializedTypeface } from './serializers/typeface'
import { SerializedQuestion } from './serializers/question'

class NotImplementedError extends Error {}
class InvalidReferenceError extends Error {}

export class Yaml {

    // Method responsible for reading the content of a file.
    read(path: string): Serialized {
        console.log(`Reading YAML: ${path}`)
        let rawContent: string = Tree.read(this.dereference(path))
        let parsedContent: any = yaml.load(rawContent)
        let curatedContent: any = this.assemble(parsedContent)
        return <Serialized>curatedContent
    }

    // Method responsible for resolving references inside YAML files.
    assemble(content: any): any {
        console.log(`Assembling ${typeof content}: ${JSON.stringify(content)}`)
        if (Array.isArray(content) || content instanceof Array) {
            content = content.map(item => this.assemble(item))
        } else if (typeof content == "object" && content != null) {
            for (let key in content) {
                content[key] = this.assemble(content[key])
            }
        } else if (typeof content === 'string' || content instanceof String) {
            content = this.dereference(<string>content)
            if (content.endsWith('.yaml'))
                content = this.read(<string>content)
        }
        return content
    }

    // Generates the full path of a reference.
    dereference(text: string): string {
        if (text.startsWith(`${Reference.FONTS}/`)) {
            console.log(`Dereferencing font: ${text}`)
            text = text.replace(Reference.FONTS, Tree.fonts)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Font file not found: ${text}`)
        } else if (text.startsWith(`${Reference.CONFIG}/`)) {
            console.log(`Dereferencing config: ${text}`)
            text = text.replace(Reference.CONFIG, Tree.config)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Config file not found: ${text}`)
        } else if (text.startsWith(`${Reference.IMAGES}/`))  {
            console.log(`Dereferencing image: ${text}`)
            text = text.replace(Reference.IMAGES, Tree.images)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Image file not found: ${text}`)
        } else if (text.startsWith(`${Reference.FILES}/`))  {
            console.log(`Dereferencing file: ${text}`)
            text = text.replace(Reference.FILES, Tree.files)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`File not found: ${text}`)
        } else if (text.startsWith(`${Reference.BOOKS}/`)) {
            console.log(`Dereferencing book: ${text}`)
            text = text.replace(Reference.BOOKS, Tree.books)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Book file not found: ${text}`)
        } else if (text.startsWith(`${Reference.PERSONS}/`)) {
            console.log(`Dereferencing person: ${text}`)
            text = text.replace(Reference.PERSONS, Tree.persons)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Person file not found: ${text}`)
        } else if (text.startsWith(`${Reference.TOPICS}/`)) {
            console.log(`Dereferencing topic: ${text}`)
            text = text.replace(Reference.TOPICS, Tree.topics)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Topic file not found: ${text}`)
        }
        return text
    }

    // Method responsible for parsing a YAML string and generating
    // the instances of the classes in the models directory.
    unserialize(data: Serialized): Model {
        console.log(`Unserializing '${data.Type}'`)
        if (!data || !data.Type)
            data.Type = Text.name
        switch(data.Type) {
            case Analogy.name: {
                let model: Analogy = new Analogy()
                model.unserialize(<SerializedAnalogy>data)
                return <Model>model
            }
            case Person.name: {
                let model: Person = new Person()
                model.unserialize(<SerializedPerson>data)
                return <Model>model
            }
            case Brand.name: {
                let model: Brand = new Brand()
                model.unserialize(<SerializedBrand>data)
                return <Model>model
            }
            case Book.name: {
                let model: Book = new Book()
                model.unserialize(<SerializedBook>data)
                return <Model>model
            }
            case Chapter.name: {
                let model: Chapter = new Chapter()
                model.unserialize(<SerializedChapter>data)
                return <Model>model
            }
            case Definition.name: {
                let model: Definition = new Definition()
                model.unserialize(<SerializedDefinition>data)
                return <Model>model
            }
            case Example.name: {
                let model: Example = new Example()
                model.unserialize(<SerializedExample>data)
                return <Model>model
            }
            case Image.name: {
                let model: Image = new Image()
                model.unserialize(<SerializedImage>data)
                return <Model>model
            }
            case File.name: {
                let model: File = new File()
                model.unserialize(<SerializedFile>data)
                return <Model>model
            }
            case Joke.name: {
                let model: Joke = new Joke()
                model.unserialize(<SerializedJoke>data)
                return <Model>model
            }
            case List.name: {
                let model: List = new List()
                model.unserialize(<SerializedList>data)
                return <Model>model
            }
            case Pallete.name: {
                let model: Pallete = new Pallete()
                model.unserialize(<SerializedPallete>data)
                return <Model>model
            }
            case Proverb.name: {
                let model: Proverb = new Proverb()
                model.unserialize(<SerializedQuote>data)
                return <Model>model
            }
            case Quote.name: {
                let model: Quote = new Quote()
                model.unserialize(<SerializedQuote>data)
                return <Model>model
            }
            case Source.name: {
                let model: Source = new Source()
                model.unserialize(<SerializedSource>data)
                return <Model>model
            }
            case Story.name: {
                let model: Story = new Story()
                model.unserialize(<SerializedStory>data)
                return <Model>model
            }
            case Text.name: {
                let model: Text = new Text()
                model.unserialize(<SerializedText>data)
                return <Model>model
            }
            case Topic.name: {
                let model: Topic = new Topic()
                model.unserialize(<SerializedTopic>data)
                return <Model>model
            }
            case Typeface.name: {
                let model: Typeface = new Typeface()
                model.unserialize(<SerializedTypeface>data)
                return <Model>model
            }
            case Question.name: {
                let model: Question = new Question()
                model.unserialize(<SerializedQuestion>data)
                return <Model>model
            }
            default: {
                throw new NotImplementedError(`Not implemented ${typeof data}: ${JSON.stringify(data)}`)
            }
        }
    }

}
