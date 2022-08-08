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
import { Text } from './models/text'
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
import { SerializedText } from './serializers/text'
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
