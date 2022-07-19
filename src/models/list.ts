// ----------------------------------------------------------------
// Purpose:
// This library implements the List class.
// ----------------------------------------------------------------

import { Model, Serializable } from './base'
import { Text, SerializedText } from './text'

export interface SerializedList extends Serializable {
    items: Array<SerializedText>
}

export class List implements Model {
    public readonly TYPE: string = 'List'

    public items: Array<Text>

    // Lazy constructor.
    constructor() {
        this.items = new Array<Text>()
    }

    // String serializers.
    toString() : string {
        return `<{this.TYPE}: {this.getTitle()}>`
    }

    // JSON serializers.
    toJson() : SerializedList {
        return {
            "type": this.TYPE,
            "items": this.items.map(item => item.toJson()),
        }
    }
    fromJson(data: SerializedList) : void {
        if (data.type != this.TYPE)
            throw new Error(`Serialization type missmatch: {data}`)
        this.items = data.items.map(item => {
            let text: Text = new Text()
            text.fromJson(item)
            return text
        })
    }
}
