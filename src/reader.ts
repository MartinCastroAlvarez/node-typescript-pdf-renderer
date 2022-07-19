// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader.
// ----------------------------------------------------------------

import readYamlFile from 'read-yaml-file'

import { Author } from './models/author'
import { Model } from './models/base'
import { Brand } from './models/brand'
import { Book } from './models/book'
import { Chapter } from './models/chapter'
import { Definition } from './models/definition'
import { Example } from './models/example'
import { List } from './models/list'
import { Proverb } from './models/proverb'
import { Quote } from './models/quote'
import { Story } from './models/story'
import { Text } from './models/text'

import { SerializedAuthor } from './serializers/author'
import { Serializable } from './serializers/base'
import { SerializedBrand } from './serializers/brand'
import { SerializedBook } from './serializers/book'
import { SerializedChapter } from './serializers/chapter'
import { SerializedDefinition } from './serializers/definition'
import { SerializedExample } from './serializers/example'
import { SerializedList } from './serializers/list'
import { SerializedProverb } from './serializers/proverb'
import { SerializedQuote } from './serializers/quote'
import { SerializedStory } from './serializers/story'
import { SerializedText } from './serializers/text'

export class Reader {

    match(data: Serializable): Model {
        switch(data.type) {
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
            default: {
                throw new Error(`Not implemented: {data}`)
            }
        }
    }

}
