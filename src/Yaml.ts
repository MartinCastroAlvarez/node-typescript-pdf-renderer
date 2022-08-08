// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader adapter.
// ----------------------------------------------------------------

const yaml = require('js-yaml')

import { Tree } from './Tree'
import { Log } from './Logging'

import { Reference } from './enums/Reference'

import { Model } from './interfaces/Model'
import { Serialized } from './interfaces/Serialized'

import { NotImplementedError } from './errors/Yaml'
import { InvalidReferenceError } from './errors/Yaml'

import { Analogy } from './models/Analogy'
import { Person } from './models/Person'
import { Brand } from './models/Brand'
import { Book } from './models/Book'
import { Chapter } from './models/Chapter'
import { Definition } from './models/Definition'
import { Dimensions } from './models/Dimensions'
import { Example } from './models/Example'
import { Image } from './models/Image'
import { File } from './models/File'
import { Joke } from './models/Joke'
import { List } from './models/List'
import { Pallete } from './models/Pallete'
import { Proverb } from './models/Proverb'
import { Quote } from './models/Quote'
import { Source } from './models/Source'
import { Story } from './models/Story'
import { Text } from './models/Text'
import { Topic } from './models/Topic'
import { Typeface } from './models/Typeface'
import { Question } from './models/Question'

// import { Challenge } from './models/Challenge' // FIXME
// import { Legend } from './models/Legend' // FIXME
// import { Conspiracy } from './models/Conspiracy' // FIXME
// import { Prophecy } from './models/Prophecy' // FIXME
// import { Exaggeration } from './models/Exaggeration' // FIXME
// import { Challenge } from './models/Challenge' // FIXME
// import { Tale } from './models/Tale' // FIXME
// import { Motivation } from './models/Motivation' // FIXME
// import { Surprise } from './models/Surprise' // FIXME
// import { Paper } from './models/Paper' // FIXME
// import { Quiz } from './models/Quiz' // FIXME
// import { Map } from './models/Map' // FIXME
// import { Table } from './models/Table' // FIXME
// import { Bar } from './models/Bar' // FIXME
// import { Pie } from './models/Pie' // FIXME
// import { Line } from './models/Line' // FIXME
// import { Graph } from './models/Graph' // FIXME
// import { Math } from './models/Math' // FIXME
// import { Code } from './models/Code' // FIXME
// import { SocialAcceptance } from './models/Code' // FIXME
// import { TurningPoint } from './models/Code' // FIXME
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

import { SerializedAnalogy } from './serializers/Analogy'
import { SerializedPerson } from './serializers/Person'
import { SerializedBrand } from './serializers/Brand'
import { SerializedBook } from './serializers/Book'
import { SerializedChapter } from './serializers/Chapter'
import { SerializedDefinition } from './serializers/Definition'
import { SerializedDimensions } from './serializers/Dimensions'
import { SerializedExample } from './serializers/Example'
import { SerializedImage } from './serializers/Image'
import { SerializedFile } from './serializers/File'
import { SerializedJoke } from './serializers/Joke'
import { SerializedList } from './serializers/List'
import { SerializedPallete } from './serializers/Pallete'
import { SerializedProverb } from './serializers/Proverb'
import { SerializedQuote } from './serializers/Quote'
import { SerializedSource } from './serializers/Source'
import { SerializedStory } from './serializers/Story'
import { SerializedText } from './serializers/Text'
import { SerializedTopic} from './serializers/Topic'
import { SerializedTypeface } from './serializers/Typeface'
import { SerializedQuestion } from './serializers/Question'

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
        const mapping: object = {
            [Reference.BOOKS]: Tree.books,
            [Reference.PERSONS]: Tree.persons,
            [Reference.I18N]: Tree.i18n,
            [Reference.TOPICS]: Tree.topics,
            [Reference.FONTS]: Tree.fonts,
            [Reference.IMAGES]: Tree.images,
            [Reference.FILES]: Tree.files,
            [Reference.CONFIG]: Tree.config,
        }
        if (mapping[text.split("/")[0]] !== undefined) {
            Log.info('Dereferencing', text)
            text = text.replace(text.split("/")[0], mapping[text.split("/")[0]])
            if (!Tree.exists(text))
                throw new InvalidReferenceError(`File not found: ${text}`)
        }
        return text
    }

    // Getting a i18n string that is not part of a specific product.
    public static getString(path: string): Text {
        Log.info('Loading string', path)
        const text: Text = new Text()
        text.unserialize(<SerializedText>Yaml.read(path))
        return text
    }

    // Method responsible for parsing a YAML string and generating
    // the instances of the classes in the models directory.
    public static unserialize(data: Serialized): Model {
        Log.info('Unserializing', typeof data, data)
        if (!data || !data.Type)
            data.Type = Text.name
        let instance: Model
        switch(data.Type) {
            case Analogy.name: {
                instance = new Analogy()
                instance.unserialize(<SerializedAnalogy>data)
                return instance
            }
            case Person.name: {
                instance = new Person()
                instance.unserialize(<SerializedPerson>data)
                return instance
            }
            case Brand.name: {
                instance = new Brand()
                instance.unserialize(<SerializedBrand>data)
                return instance
            }
            case Book.name: {
                instance = new Book()
                instance.unserialize(<SerializedBook>data)
                return instance
            }
            case Chapter.name: {
                instance = new Chapter()
                instance.unserialize(<SerializedChapter>data)
                return instance
            }
            case Definition.name: {
                instance = new Definition()
                instance.unserialize(<SerializedDefinition>data)
                return instance
            }
            case Dimensions.name: {
                instance = new Dimensions()
                instance.unserialize(<SerializedDimensions>data)
                return instance
            }
            case Example.name: {
                instance = new Example()
                instance.unserialize(<SerializedExample>data)
                return instance
            }
            case Image.name: {
                instance = new Image()
                instance.unserialize(<SerializedImage>data)
                return instance
            }
            case File.name: {
                instance = new File()
                instance.unserialize(<SerializedFile>data)
                return instance
            }
            case Joke.name: {
                instance = new Joke()
                instance.unserialize(<SerializedJoke>data)
                return instance
            }
            case List.name: {
                instance = new List()
                instance.unserialize(<SerializedList>data)
                return instance
            }
            case Pallete.name: {
                instance = new Pallete()
                instance.unserialize(<SerializedPallete>data)
                return instance
            }
            case Proverb.name: {
                instance = new Proverb()
                instance.unserialize(<SerializedQuote>data)
                return instance
            }
            case Quote.name: {
                instance = new Quote()
                instance.unserialize(<SerializedQuote>data)
                return instance
            }
            case Source.name: {
                instance = new Source()
                instance.unserialize(<SerializedSource>data)
                return instance
            }
            case Story.name: {
                instance = new Story()
                instance.unserialize(<SerializedStory>data)
                return instance
            }
            case Text.name: {
                instance = new Text()
                instance.unserialize(<SerializedText>data)
                return instance
            }
            case Topic.name: {
                instance = new Topic()
                instance.unserialize(<SerializedTopic>data)
                return instance
            }
            case Typeface.name: {
                instance = new Typeface()
                instance.unserialize(<SerializedTypeface>data)
                return instance
            }
            case Question.name: {
                instance = new Question()
                instance.unserialize(<SerializedQuestion>data)
                return instance
            }
            default: {
                throw new NotImplementedError(`Not implemented ${typeof data}: ${JSON.stringify(data)}`)
            }
        }
    }
}
