// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { SerializedStory } from '../serializers/story'

import { Model } from '../interfaces/model'

import { Log } from '../logging'

import { Source } from './source'
import { Topic } from './topic'
import { Text } from './text'
import { Yaml } from '../yaml'

export class Story implements Model {
    public readonly title: Text = new Text()
    public sources: Array<Source> = new Array<Source>()
    public blocks: Array<Model> = new Array<Model>()
    public topics: Array<Topic> = new Array<Topic>()

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // JSON serializers.
    serialize(): SerializedStory {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialize(),
            "Blocks": this.blocks?.map(block => block.serialize()),
            "Topics": this.topics?.map(topic => topic.serialize()),
            "Sources": this.sources?.map(source => source.serialize()),
        }
    }
    unserialize(data: SerializedStory): void {
        if (data) {
            Log.info('Loading Story', data)
            this.title.unserialize(data['Title']) 
            this.blocks = data['Blocks']?.map(block => Yaml.unserialize(block))
            this.topics = data['Topics']?.map(topic => <Topic>Yaml.unserialize(topic))
            this.sources = data['Source']?.map(source => <Source>Yaml.unserialize(source))
        }
    }
}
