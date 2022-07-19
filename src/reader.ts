// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader.
// ----------------------------------------------------------------

import readYamlFile from 'read-yaml-file'

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
import { Proverb } from './models/proverb'
import { Quote } from './models/quote'
import { Source } from './models/source'
import { Story } from './models/story'
import { Text } from './models/text'
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
import { SerializedProverb } from './serializers/proverb'
import { SerializedQuote } from './serializers/quote'
import { SerializedSource } from './serializers/source'
import { SerializedStory } from './serializers/story'
import { SerializedText } from './serializers/text'
import { SerializedQuestion } from './serializers/question'

export class Reader {

    match(data: Serialized): Model {
        switch(data.Type) {
            case Analogy.name: {
                let model: Analogy = new Analogy()
                model.fromJson(<SerializedAnalogy>data)
                return <Model>model
            }
            case Author.name: {
                let model: Author = new Author()
                model.fromJson(<SerializedAuthor>data)
                return <Model>model
            }
            case Brand.name: {
                let model: Brand = new Brand()
                model.fromJson(<SerializedBrand>data)
                return <Model>model
            }
            case Book.name: {
                let model: Book = new Book()
                model.fromJson(<SerializedBook>data)
                return <Model>model
            }
            case Chapter.name: {
                let model: Chapter = new Chapter()
                model.fromJson(<SerializedChapter>data)
                return <Model>model
            }
            case Definition.name: {
                let model: Definition = new Definition()
                model.fromJson(<SerializedDefinition>data)
                return <Model>model
            }
            case Example.name: {
                let model: Example = new Example()
                model.fromJson(<SerializedExample>data)
                return <Model>model
            }
            case Image.name: {
                let model: Image = new Image()
                model.fromJson(<SerializedImage>data)
                return <Model>model
            }
            case File.name: {
                let model: File = new File()
                model.fromJson(<SerializedFile>data)
                return <Model>model
            }
            case Joke.name: {
                let model: Joke = new Joke()
                model.fromJson(<SerializedJoke>data)
                return <Model>model
            }
            case List.name: {
                let model: List = new List()
                model.fromJson(<SerializedList>data)
                return <Model>model
            }
            case Proverb.name: {
                let model: Proverb = new Proverb()
                model.fromJson(<SerializedQuote>data)
                return <Model>model
            }
            case Quote.name: {
                let model: Quote = new Quote()
                model.fromJson(<SerializedQuote>data)
                return <Model>model
            }
            case Source.name: {
                let model: Source = new Source()
                model.fromJson(<SerializedSource>data)
                return <Model>model
            }
            case Story.name: {
                let model: Story = new Story()
                model.fromJson(<SerializedStory>data)
                return <Model>model
            }
            case Text.name: {
                let model: Text = new Text()
                model.fromJson(<SerializedText>data)
                return <Model>model
            }
            case Question.name: {
                let model: Question = new Question()
                model.fromJson(<SerializedQuestion>data)
                return <Model>model
            }
            default: {
                throw new Error(`Not implemented: {data}`)
            }
        }
    }

}
