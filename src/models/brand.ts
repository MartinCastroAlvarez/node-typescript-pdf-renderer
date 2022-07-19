// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand class.
// ----------------------------------------------------------------

import { Model, Serializable } from './base'

interface SerializedBrand extends Serializable {
    title: string
}

export class Brand implements Model {
    private title: string

    // Lazy constructor.
    constructor() {
        this.title = ''
    }

    // Titlegetter and setter.
    getTitle() : string { return this.title }
    setTitle(title: string) { this.title = title }

    // String serializers.
    toString() : string {
        return `<{this.TYPE}: {this.getTitle()}>`
    }

    // JSON serializers.
    toJson() : SerializedAuthor {
        return {
            "type": this.TYPE,
            "title": this.getTitle(),
        }
    }
    fromJson(data: SerializedAuthor) : void {
        if (data.type != this.TYPE)
            throw new Error(`Serialization type missmatch: {data}`)
        this.setTitle(data.title)
    }
}
}
