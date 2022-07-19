// ----------------------------------------------------------------
// Purpose:
// This library implements the Source class.
// ----------------------------------------------------------------

import { SerializedSource } from '../serializers/source'

import { Author } from './author'
import { Model } from './base'
import { Image } from './image'
import { Text } from './text'

export class Source implements Model {
    private title: string
    public authors: Array<Author>
    public readonly logo: Image

    // Lazy constructor.
    constructor() {
        this.title = ''
        this.authors = new Array<Author>()
        this.logo = new Image()
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) {
        if (!title || title.length > 30)
            throw new Error(`Invalid title name: {title}`)
        this.title = title
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getTitle()}>`
    }

    // JSON serializers.
    toJson(): SerializedSource {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.getTitle(),
            "Authors": this.authors.map(author => author.toJson()),
            "Logo": this.logo.toJson(),
        }
    }
    fromJson(data: SerializedSource): void {
        this.setTitle(data['Title'])
        this.authors = data['Authors'].map(data => {
            let author: Author = new Author()
            author.fromJson(data)
            return author
        })
        this.logo.fromJson(data['Logo'])
    }
}
