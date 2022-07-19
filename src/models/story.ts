// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { Model, Serializable } from './base'
import { Text, SerializedText } from './text'
import { Reader } from '../reader'

export interface SerializedStory extends Serializable {
    title: SerializedText
    blocks: Array<Serializable>
}

export class Story implements Model {
    public readonly TYPE: string = 'Story'

    public readonly title: Text
    public blocks: Array<Model>

    // Lazy constructor.
    constructor() {
        this.blocks = new Array<Model>()
        this.title = new Text()
    }

    // String serializers.
    toString() : string {
        return `<{this.TYPE}: {this.Title()}>`
    }

    // JSON serializers.
    toJson() : SerializedStory {
        return {
            "type": this.TYPE,
            "title": this.title.toJson(),
            "blocks": this.blocks.map(block => block.toJson()),
        }
    }
    fromJson(data: SerializedStory) : void {
        if (data.type != this.TYPE)
            throw new Error(`Serialization type missmatch: {data}`)
        this.title.fromJson(data.title) 
        this.blocks = data.blocks.map(block => {
            let reader: Reader = new Reader()
            return reader.match(block)
        })
    }
}
