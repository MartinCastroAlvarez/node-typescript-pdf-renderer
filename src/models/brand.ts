// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand class.
// ----------------------------------------------------------------

import { SerializedBrand } from '../serializers/brand'

import { Author } from './author'
import { Model } from './base'
import { Image } from './image'

export class Brand implements Model {
    private title: string
    public readonly logo: Image
    public authors: Array<Author>

    // Lazy constructor.
    constructor() {
        this.title = ''
        this.logo = new Image()
        this.authors = new Array<Author>()
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) { this.title = title }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getTitle()}>`
    }

    // JSON serializers.
    serialize(): SerializedBrand {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.getTitle(),
            "Authors": this.authors?.map(author => author.serialize()),
            "Logo": this.logo.serialize(),
        }
    }
    unserialize(data: SerializedBrand): void {
        if (data) {
            console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
            this.setTitle(data['Title'])
            this.logo.unserialize(data['Logo'])
            this.authors = data['Authors']?.map(data => {
                let author = new Author()
                author.unserialize(data)
                return author
            })
        }
    }
}
