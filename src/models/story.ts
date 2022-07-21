// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { SerializedStory } from '../serializers/story'

import { Model } from './base'
import { Text } from './text'
import { Yaml } from '../yaml'

export class Story implements Model {
    public readonly title: Text
    public blocks: Array<Model>

    // Lazy constructor.
    constructor() {
        this.blocks = new Array<Model>()
        this.title = new Text()
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // JSON serializers.
    serialize(): SerializedStory {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialize(),
            "Blocks": this.blocks.map(block => block.serialize()),
        }
    }
    unserialize(data: SerializedStory): void {
        if (data) {
            console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
            this.title.unserialize(data['Title']) 
            this.blocks = data['Blocks'].map(block => {
                console.log(`Loading story blocks.`)
                let yaml: Yaml = new Yaml()
                return yaml.unserialize(block)
            })
        }
    }
}
