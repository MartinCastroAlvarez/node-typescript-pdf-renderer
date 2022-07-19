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
    public items: Array<Text>

    // Lazy constructor.
    constructor() {
        this.items = new Array<Text>()
    }

    // String serializers.
    toString() : string {
        return `<{(this as any).constructor.name}: {this.getTitle()}>`
    }

    // JSON serializers.
    toJson() : SerializedList {
        return {
            "type": (this as any).constructor.name,
            "items": this.items.map(item => item.toJson()),
        }
    }
    fromJson(data: SerializedList) : void {
        this.items = data.items.map(item => {
            let text: Text = new Text()
            text.fromJson(item)
            return text
        })
    }
}
