// ----------------------------------------------------------------
// PURPOSE:
// This class implements the YAML reader adapter.
//
// ABSTRACT FACTORY DESIGN PATTERN:
// Abstract Factory is a creational design pattern that lets you
// produce families of related objects without specifying their
// concrete classes.
// ----------------------------------------------------------------

const yaml = require('js-yaml')

import { Log } from './Logging'
import { Tree } from './Tree'

import { Reference } from '../enums/Reference'

import { Model } from '../interfaces/Model'
import { Serialized } from '../interfaces/Serialized'

import { InvalidReferenceError, NotImplementedError } from '../errors/Yaml'

import { Book } from '../models/Book'
import { Brand } from '../models/Brand'
import { Chapter } from '../models/Chapter'
import { Code } from '../models/Code'
import { Definition } from '../models/Definition'
import { Dimensions } from '../models/Dimensions'
import { Edition } from '../models/Edition'
import { Example } from '../models/Example'
import { File } from '../models/File'
import { Image } from '../models/Image'
import { Link } from '../models/Link'
import { List } from '../models/List'
import { Note } from '../models/Note'
import { Pallete } from '../models/Pallete'
import { Person } from '../models/Person'
import { Question } from '../models/Question'
import { Quote } from '../models/Quote'
import { Source } from '../models/Source'
import { Story } from '../models/Story'
import { Text } from '../models/Text'
import { Topic } from '../models/Topic'
import { Typeface } from '../models/Typeface'
import { Important } from '../models/Important'

import { SerializedText } from '../serializers/Text'

export abstract class Yaml {

    // ----------------------------------------------------------------
    // Method responsible for reading the content of a file.
    // ----------------------------------------------------------------
    public static read(path: string): Serialized {
        Log.info('Reading YAML', path)
        let rawContent: string = Tree.read(Yaml.dereference(path))
        let parsedContent: any = yaml.load(rawContent)
        let curatedContent: any = Yaml.assemble(parsedContent)
        return <Serialized>curatedContent
    }

    // ----------------------------------------------------------------
    // Method responsible for resolving references inside YAML files.
    // ----------------------------------------------------------------
    public static assemble(content: any): any {
        Log.info('Assembling', typeof content, content)
        if (Array.isArray(content) || content instanceof Array) {
            content = content.map(item => Yaml.assemble(item))
        } else if (typeof content === "object" && content != null) {
            for (let key of Object.keys(content)) {
                if (content.hasOwnProperty(key)) {
                    content[key] = Yaml.assemble(content[key])
                }
            }
        } else if (typeof content === 'string' || content instanceof String) {
            content = Yaml.dereference(<string>content)
            if (content.endsWith('.yaml')) {
                content = Yaml.read(<string>content)
            }
        }
        return content
    }

    // ----------------------------------------------------------------
    // Generates the full path of a reference.
    // ----------------------------------------------------------------
    public static dereference(text: string): string {
        const mapping: object = {
            [Reference.BOOKS]: Tree.books,
            [Reference.PERSONS]: Tree.persons,
            [Reference.CODE]: Tree.code,
            [Reference.I18N]: Tree.i18n,
            [Reference.LEGAL]: Tree.legal,
            [Reference.TOPICS]: Tree.topics,
            [Reference.FONTS]: Tree.fonts,
            [Reference.IMAGES]: Tree.images,
            [Reference.STORIES]: Tree.stories,
            [Reference.CHAPTERS]: Tree.chapters,
            [Reference.FILES]: Tree.files,
            [Reference.CONFIG]: Tree.config,
        }
        if (mapping[text.split("/")[0]] !== undefined) {
            Log.info('Dereferencing', text)
            text = text.replace(text.split("/")[0], mapping[text.split("/")[0]])
            if (!Tree.exists(text)) {
                throw new InvalidReferenceError(`File not found: ${text}`)
            }
        }
        return text
    }

    // ----------------------------------------------------------------
    // Getting a i18n string that is not part of a specific product.
    // ----------------------------------------------------------------
    public static getString(path: string): Text {
        Log.info('Loading string', path)
        const text: Text = new Text()
        text.deserialise(<SerializedText>Yaml.read(path))
        return text
    }

    // ----------------------------------------------------------------
    // Method responsible for parsing a YAML string and generating
    // the instances of the classes in the models directory.
    // ----------------------------------------------------------------
    public static deserialise(data: Serialized): Model {
        Log.info('Unserializing', typeof data, data)
        if (!data || !data.Type) {
            data.Type = Text.name
        }
        const instance: Model = Yaml.getInstance(data.Type)
        Log.info('Unserialised', typeof instance, instance)
        instance.deserialise(data)
        return instance
    }

    // ----------------------------------------------------------------
    // Dynamically detecting what is the class of the object.
    // ----------------------------------------------------------------
    public static getInstance(type: string): Model {
        Log.info('Parsing', type)
        switch(type) {
            case Person.name: return new Person()
            case Brand.name: return new Brand()
            case Book.name: return new Book()
            case Chapter.name: return new Chapter()
            case Definition.name: return new Definition()
            case Dimensions.name: return new Dimensions()
            case Example.name: return new Example()
            case Image.name: return new Image()
            case File.name: return new File()
            case Note.name: return new Note()
            case Link.name: return new Link()
            case List.name: return new List()
            case Pallete.name: return new Pallete()
            case Quote.name: return new Quote()
            case Source.name: return new Source()
            case Story.name: return new Story()
            case Text.name: return new Text()
            case Important.name: return new Important()
            case Topic.name: return new Topic()
            case Typeface.name: return new Typeface()
            case Question.name: return new Question()
            case Code.name: return new Code()
            case Edition.name: return new Edition()
            default: {
                throw new NotImplementedError(`Not implemented ${type}`)
            }
        }
    }
}
