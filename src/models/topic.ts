// ----------------------------------------------------------------
// Purpose:
// This library implements the Topic class.
// ----------------------------------------------------------------

import { SerializedTopic } from '../serializers/topic'

import { Model } from '../interfaces/model'

import { Image } from './image'
import { Text } from './text'

export class Topic implements Model {
    public readonly title: Text
    public readonly description: Text
    public readonly logo: Image

    // Lazy constructor.
    constructor() {
        this.title = new Text()
        this.description = new Text()
        this.logo = new Image()
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // JSON serializers.
    serialize(): SerializedTopic{
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialize(),
            "Description": this.description.serialize(),
            "Logo": this.logo.serialize(),
        }
    }
    unserialize(data: SerializedTopic): void {
        if (data) {
            console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
            this.title.unserialize(data['Title'])
            this.description.unserialize(data['Description'])
            this.logo.unserialize(data['Logo'])
        }
    }
}
