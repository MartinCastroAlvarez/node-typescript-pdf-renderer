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
        return `<{(this as any).constructor.name}: {this.getTitle()}>`
    }

    // JSON serializers.
    toJson() : SerializedBrand {
        return {
            "type": (this as any).constructor.name,
            "title": this.getTitle(),
        }
    }
    fromJson(data: SerializedBrand) : void {
        this.setTitle(data.title)
    }
}
