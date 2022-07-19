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

    // List size getter.
    getSize(): number {
        return this.items.length
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getSize()}>`
    }

    // JSON serializers.
    toJson(): SerializedList {
        return {
            "Type": (this as any).constructor.name,
            "Items": this.items.map(item => item.toJson()),
        }
    }
    fromJson(data: SerializedList): void {
        console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
        if (data) {
            this.items = data['Items'].map(item => {
                let text: Text = new Text()
                text.fromJson(item)
                return text
            })
        }
    }
}
