// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { SerializedStory } from '../serializers/story'

import { Model } from './base'
import { Text } from './text'
import { Reader } from '../reader'

export class Story implements Model {
    public readonly title: Text
    public blocks: Array<Model>

    // Lazy constructor.
    constructor() {
        this.blocks = new Array<Model>()
        this.title = new Text()
    }

    // String serializers.
    toString() : string {
        return `<{(this as any).constructor.name}: {this.title.get()}>`
    }

    // JSON serializers.
    toJson() : SerializedStory {
        return {
            "type": (this as any).constructor.name,
            "title": this.title.toJson(),
            "blocks": this.blocks.map(block => block.toJson()),
        }
    }
    fromJson(data: SerializedStory) : void {
        this.title.fromJson(data.title) 
        this.blocks = data.blocks.map(block => {
            let reader: Reader = new Reader()
            return reader.match(block)
        })
    }
}
