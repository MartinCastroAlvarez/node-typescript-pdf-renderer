// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { SerializedChapter } from '../serializers/Chapter'

import { Model } from '../interfaces/Model'

import { Text } from './Text'
import { Topic } from './Topic'
import { Story } from './Story'

import { Log } from '../Logging'
import { Yaml } from '../Yaml'

export class Chapter {
    public readonly title: Text = new Text()
    public introduction: Array<Text> = new Array<Text>()
    public conclusion: Array<Text> = new Array<Text>()
    public stories: Array<Story> = new Array<Story>()

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
