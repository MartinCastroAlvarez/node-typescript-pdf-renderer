// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { SerializedChapter } from '../serializers/chapter'

import { Model } from '../interfaces/model'

import { Text } from './text'
import { Topic } from './topic'
import { Story } from './story'

import { Log } from '../logging'
import { Yaml } from '../yaml'

export class Chapter {
    public readonly title: Text 
    public introduction: Array<Text>
    public conclusion: Array<Text>
    public stories: Array<Story>

    // Lazy constructor.
    constructor() {
        this.stories = new Array<Story>()
        this.introduction = new Array<Text>()
        this.conclusion = new Array<Text>()
        this.title = new Text()
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // Extracts topics from Stories.
    getTopics(): Array<Topic> {
        let set: Set<string> = new Set<string>()
        return this.stories.reduce(
            (accumulator, story) => accumulator.concat(story.topics),
            []
        ).filter(
            topic => !set.has(topic.title.get()) && set.add(topic.title.get())
        )
    }

    // JSON serializers.
    serialize(): SerializedChapter {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialize(),
            "Topics": this.getTopics()?.map(topic => topic.serialize()),
            "Introduction": this.introduction?.map(block => block.serialize()),
            "Stories": this.stories?.map(story => story.serialize()),
            "Conclusion": this.conclusion?.map(block => block.serialize()),
        }
    }
    unserialize(data: SerializedChapter): void {
        if (data) {
            Log.info('Loading Chapter', data)
            this.title.unserialize(data['Title']) 
            this.introduction = data['Introduction']?.map(x => <Text>Yaml.unserialize(x))
            this.conclusion = data['Conclusion']?.map(x => <Text>Yaml.unserialize(x))
            this.stories = data['Stories']?.map(x => <Story>Yaml.unserialize(x))
        }
    }
}
