// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand class.
// ----------------------------------------------------------------

import { Model, Serializable } from './base'

interface SerializedBrand extends Serializable {
    title: string
}

export class Brand implements Model {
    public readonly TYPE: string = 'Brand'

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
    toJson() : SerializedBrand {
        return {
            "type": this.TYPE,
            "title": this.getTitle(),
        }
    }
    fromJson(data: SerializedBrand) : void {
        if (data.type != this.TYPE)
            throw new Error(`Serialization type missmatch: {data}`)
        this.setTitle(data.title)
    }
}
