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
    public readonly author: Author

    // Lazy constructor.
    constructor() {
        this.title = ''
        this.logo = new Image()
        this.author = new Author()
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) { this.title = title }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getTitle()}>`
    }

    // JSON serializers.
    toJson(): SerializedBrand {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.getTitle(),
            "Author": this.author.toJson(),
            "Logo": this.logo.toJson(),
        }
    }
    fromJson(data: SerializedBrand): void {
        console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
        if (data) {
            this.setTitle(data['Title'])
            this.logo.fromJson(data['Logo'])
            this.author.fromJson(data['Author'])
        }
    }
}
