// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader.
// ----------------------------------------------------------------

import readYamlFile from 'read-yaml-file'

import { Model, Serializable } from './models/base'

import { Author } from './models/author'
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
import { SerializedBrand } from './erializers/brand'
import { SerializedBook } from './erializers/book'
import { SerializedChapter } from './erializers/chapter'
import { SerializedDefinition } from './erializers/definition'
import { SerializedExample } from './erializers/example'
import { SerializedList } from './erializers/list'
import { SerializedProverb } from './erializers/proverb'
import { SerializedQuote } from './erializers/quote'
import { SerializedStory } from './erializers/story'
import { SerializedText } from './erializers/text'

export class Reader {

    match(data: Serializable): Model {
        switch(data.type) {
            case Author.name: {
                let model: Author = new Author()
                model.fromJson(<SerializedAuthor>data)
                return model
            }
            case Brand.name: {
                let model: Brand = new Brand()
                model.fromJson(<SerializedBrand>data)
                return model
            }
            case Book.name: {
                let model: Book = new Book()
                model.fromJson(<SerializedBook>data)
                return model
            }
            case Chapter.name: {
                let model: Chapter = new Chapter()
                model.fromJson(<SerializedChapter>data)
                return model
            }
            case Definition.name: {
                let model: Definition = new Definition()
                model.fromJson(<SerializedDefinition>data)
                return model
            }
            case Example.name: {
                let model: Example = new Example()
                model.fromJson(<SerializedExample>data)
                return model
            }
            case List.name: {
                let model: List = new List()
                model.fromJson(<SerializedList>data)
                return model
            }
            case Proverb.name: {
                let model: Proverb = new Proverb()
                model.fromJson(<SerializedQuote>data)
                return model
            }
            case Quote.name: {
                let model: Quote = new Quote()
                model.fromJson(<SerializedQuote>data)
                return model
            }
            case Story.name: {
                let model: Story = new Story()
                model.fromJson(<SerializedStory>data)
                return model
            }
            case Text.name: {
                let model: Text = new Text()
                model.fromJson(<SerializedText>data)
                return model
            }
            default: {
                throw new Error(`Not implemented: {data}`)
            }
        }
    }

}
