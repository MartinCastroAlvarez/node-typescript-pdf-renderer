// ----------------------------------------------------------------
// Purpose:
// This library implements the List class.
// ----------------------------------------------------------------

import { SerializedList } from '../serializers/list'

import { Model } from './base'
import { Text } from './text'

export class List implements Model {
    public items: Array<Text>

    // Lazy constructor.
    constructor() {
        this.items = new Array<Text>()
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getTitle()}>`
    }

    // JSON serializers.
    toJson(): SerializedList {
        return {
            "Type": (this as any).constructor.name,
            "Items": this.items.map(item => item.toJson()),
        }
    }
    fromJson(data: SerializedList): void {
        this.items = data['Items'].map(item => {
            let text: Text = new Text()
            text.fromJson(item)
            return text
        })
    }
}
