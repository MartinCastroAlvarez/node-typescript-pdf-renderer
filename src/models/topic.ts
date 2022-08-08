// ----------------------------------------------------------------
// Purpose:
// This library implements the Topic class.
// ----------------------------------------------------------------

import { SerializedTopic } from '../serializers/topic'

import { Model } from '../interfaces/model'

import { Log } from '../logging'

import { Image } from './image'
import { Text } from './text'

export class Topic implements Model {
    public readonly title: Text = new Text()
    public readonly description: Text = new Text()
    public readonly avatar: Image = new Image()

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
            "Avatar": this.avatar.serialize(),
        }
    }
    unserialize(data: SerializedTopic): void {
        if (data) {
            Log.info('Loading Topic', data)
            this.title.unserialize(data['Title'])
            this.description.unserialize(data['Description'])
            this.avatar.unserialize(data['Avatar'])
        }
    }
}
