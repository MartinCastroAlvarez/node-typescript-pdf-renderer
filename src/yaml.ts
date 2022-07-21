// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader adapter.
// ----------------------------------------------------------------

const yaml = require('js-yaml')

import { Tree } from './tree'
import { Reference } from './enums/reference'

import { Analogy } from './models/analogy'
import { Author } from './models/author'
import { Model } from './models/base'
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

import { SerializedAnalogy } from './serializers/analogy'
import { SerializedAuthor } from './serializers/author'
import { Serialized } from './serializers/base'
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
import { SerializedTypeface } from './serializers/typeface'
import { SerializedQuestion } from './serializers/question'

export class Yaml {

    // Method responsible for reading the content of a file.
    read(path: string): Serialized {
        console.log(`Reading YAML: ${path}`)
        let tree: Tree = new Tree()
        let rawContent: string = tree.read(this.dereference(path))
        console.log(`Raw content: ${rawContent}`)
        let parsedContent: object = yaml.load(rawContent)
        console.log(`Parsed Content: ${JSON.stringify(rawContent)}`)
        let curatedContent: object = this.assemble(parsedContent)
        return <Serialized>curatedContent
    }

    // Method responsible for resolving references inside YAML files.
    assemble(content: object): object {
        console.log(`Assembling: ${content}`)
        for (let key in Object.keys(content)) {
            console.error(key) // FIXME
            console.error(typeof content[key]) // FIXME
            if (Array.isArray(content[key])) {
                content[key] = content[key].map(item => this.assemble(item))
            } else if (typeof content[key] == "object" && content[key] != null) {
                content[key] = this.assemble(content[key])
            } else if (typeof content[key] === 'string' || content[key] instanceof String) {
                content[key] = this.dereference(content[key])
                if (content[key].endsWith('.yaml'))
                    content[key] = this.read(content[key])
            }
        }
        return content
    }

    // Generates the full path of a reference.
    dereference(text: string): string {
        console.log(`Dereferencing: ${text}`)
        let tree: Tree = new Tree()
        if (text.startsWith(`${Reference.FONTS}/`))
            text = text.replace(Reference.FONTS, tree.fonts)
        if (text.startsWith(`${Reference.CONFIG}/`))
            text = text.replace(Reference.CONFIG, tree.config)
        if (text.startsWith(`${Reference.IMAGES}/`))
            text = text.replace(Reference.IMAGES, tree.images)
        if (text.startsWith(`${Reference.BOOKS}/`))
            text = text.replace(Reference.BOOKS, tree.books)
        if (text.startsWith(`${Reference.PERSONS}/`))
            text = text.replace(Reference.PERSONS, tree.persons)
        console.log(`Dereferenced: ${text}`)
        return text
    }

    // Method responsible for parsing a YAML string and generating
    // the instances of the classes in the models directory.
    unserialize(data: Serialized): Model {
        console.log(`Unserializing '${data.Type}'`)
        switch(data.Type) {
            case Analogy.name: {
                let model: Analogy = new Analogy()
                model.unserialize(<SerializedAnalogy>data)
                return <Model>model
            }
            case Author.name: {
                let model: Author = new Author()
                model.unserialize(<SerializedAuthor>data)
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
                throw new Error(`Not implemented: {data}`)
            }
        }
    }

}
