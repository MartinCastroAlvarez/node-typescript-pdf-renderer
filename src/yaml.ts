// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader adapter.
// ----------------------------------------------------------------

const yaml = require('js-yaml')

import { Tree } from './tree'
import { Log } from './logging'

import { Reference } from './enums/reference'

import { Model } from './interfaces/model'
import { Serialized } from './interfaces/serialized'

import { NotImplementedError } from './errors/yaml'
import { InvalidReferenceError } from './errors/yaml'

import { Analogy } from './models/analogy'
import { Person } from './models/person'
import { Brand } from './models/brand'
import { Book } from './models/book'
import { Chapter } from './models/chapter'
import { Definition } from './models/definition'
import { Dimensions } from './models/dimensions'
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
import { Subtitle } from './models/subtitle'
import { Text } from './models/text'
import { Title } from './models/title'
import { Topic } from './models/topic'
import { Typeface } from './models/typeface'
import { Question } from './models/question'

// import { Challenge } from './models/challenge' // FIXME
// import { Legend } from './models/legend' // FIXME
// import { Conspiracy } from './models/conspiracy' // FIXME
// import { Prophecy } from './models/prophecy' // FIXME
// import { Exaggeration } from './models/exaggeration' // FIXME
// import { Challenge } from './models/challenge' // FIXME
// import { Tale } from './models/tale' // FIXME
// import { Motivation } from './models/motivation' // FIXME
// import { Surprise } from './models/surprise' // FIXME
// import { Paper } from './models/paper' // FIXME
// import { Quiz } from './models/quiz' // FIXME
// import { Map } from './models/map' // FIXME
// import { Table } from './models/table' // FIXME
// import { Bar } from './models/bar' // FIXME
// import { Pie } from './models/pie' // FIXME
// import { Line } from './models/Line' // FIXME
// import { Graph } from './models/graph' // FIXME
// import { Math } from './models/math' // FIXME
// import { Code } from './models/code' // FIXME
// import { SocialAcceptance } from './models/code' // FIXME
// import { TurningPoint } from './models/code' // FIXME
// import { Cliffhanger } from './models/code' // FIXME
// import { HumanScale } from './models/code' // FIXME
// import { PersonalExperience } from './models/code' // FIXME
// import { Benefit } from './models/code' // FIXME
// import { Imagine } from './models/code' // FIXME
// import { Authority } from './models/code' // FIXME
// import { Challenge } from './models/code' // FIXME
// import { Feelings } from './models/code' // FIXME
// import { Childhood } from './models/code' // FIXME
// import { Game } from './models/code' // FIXME
// import { Urgent } from './models/code' // FIXME
// import { TerrorTale } from './models/code' // FIXME
// import { HeroicTale } from './models/code' // FIXME
// import { EroticTale } from './models/code' // FIXME
// import { Link } from './models/code' // FIXME
// import { Post } from './models/code' // FIXME
// import { Research } from './models/code' // FIXME
// import { Study } from './models/code' // FIXME
// import { Statistics } from './models/code' // FIXME

import { SerializedAnalogy } from './serializers/analogy'
import { SerializedPerson } from './serializers/person'
import { SerializedBrand } from './serializers/brand'
import { SerializedBook } from './serializers/book'
import { SerializedChapter } from './serializers/chapter'
import { SerializedDefinition } from './serializers/definition'
import { SerializedDimensions } from './serializers/dimensions'
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
import { SerializedSubtitle } from './serializers/subtitle'
import { SerializedText } from './serializers/text'
import { SerializedTitle } from './serializers/title'
import { SerializedTopic} from './serializers/topic'
import { SerializedTypeface } from './serializers/typeface'
import { SerializedQuestion } from './serializers/question'

export abstract class Yaml {

    // Method responsible for reading the content of a file.
    public static read(path: string): Serialized {
        Log.info('Reading YAML', path)
        let rawContent: string = Tree.read(Yaml.dereference(path))
        let parsedContent: any = yaml.load(rawContent)
        let curatedContent: any = Yaml.assemble(parsedContent)
        return <Serialized>curatedContent
    }

    // Method responsible for resolving references inside YAML files.
    public static assemble(content: any): any {
        Log.info('Assembling', content)
        if (Array.isArray(content) || content instanceof Array) {
            content = content.map(item => Yaml.assemble(item))
        } else if (typeof content == "object" && content != null) {
            for (let key in content) {
                content[key] = Yaml.assemble(content[key])
            }
        } else if (typeof content === 'string' || content instanceof String) {
            content = Yaml.dereference(<string>content)
            if (content.endsWith('.yaml'))
                content = Yaml.read(<string>content)
        }
        return content
    }

    // Generates the full path of a reference.
    public static dereference(text: string): string {
        if (text.startsWith(`${Reference.FONTS}/`)) {
            Log.info('Dereferencing font', text)
            text = text.replace(Reference.FONTS, Tree.fonts)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Font file not found: ${text}`)
        } else if (text.startsWith(`${Reference.CONFIG}/`)) {
            Log.info('Dereferencing config', text)
            text = text.replace(Reference.CONFIG, Tree.config)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Config file not found: ${text}`)
        } else if (text.startsWith(`${Reference.IMAGES}/`))  {
            Log.info('Dereferencing image', text)
            text = text.replace(Reference.IMAGES, Tree.images)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Image file not found: ${text}`)
        } else if (text.startsWith(`${Reference.FILES}/`))  {
            Log.info('Dereferencing file', text)
            text = text.replace(Reference.FILES, Tree.files)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`File not found: ${text}`)
        } else if (text.startsWith(`${Reference.BOOKS}/`)) {
            Log.info('Dereferencing book', text)
            text = text.replace(Reference.BOOKS, Tree.books)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Book file not found: ${text}`)
        } else if (text.startsWith(`${Reference.PERSONS}/`)) {
            Log.info('Dereferencing person', text)
            text = text.replace(Reference.PERSONS, Tree.persons)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Person file not found: ${text}`)
        } else if (text.startsWith(`${Reference.I18N}/`)) {
            Log.info('Dereferencing i18n text', text)
            text = text.replace(Reference.I18N, Tree.i18n)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`I18N file not found: ${text}`)
        } else if (text.startsWith(`${Reference.TOPICS}/`)) {
            Log.info('Dereferencing topic', text)
            text = text.replace(Reference.TOPICS, Tree.topics)
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`Topic file not found: ${text}`)
        }
        return text
    }

    // Getting a i18n string that is not part of a specific product.
    public static getString(path: string): Text {
        const text: Text = new Text()
        text.unserialize(<SerializedText>Yaml.read(path))
        return text
    }

    // Method responsible for parsing a YAML string and generating
    // the instances of the classes in the models directory.
    public static unserialize(data: Serialized): Model {
        Log.info('Unserializing', data)
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
            case Dimensions.name: {
                let model: Dimensions = new Dimensions()
                model.unserialize(<SerializedDimensions>data)
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
            case Subtitle.name: {
                let model: Subtitle = new Subtitle()
                model.unserialize(<SerializedSubtitle>data)
                return <Model>model
            }
            case Text.name: {
                let model: Text = new Text()
                model.unserialize(<SerializedText>data)
                return <Model>model
            }
            case Title.name: {
                let model: Title = new Title()
                model.unserialize(<SerializedTitle>data)
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
