// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { Model, Serializable } from './base'
import { Text, SerializedText } from './text'
import { Reader } from '../reader'
import { Story, SerializedStory } from './story'

export interface SerializedChapter extends Serializable {
    title: SerializedText
    introduction: Array<Serializable>
    stories: Array<SerializedStory>
    conclusion: Array<Serializable>
}

export class Chapter {
    public readonly TYPE: string = 'Chapter'

    public readonly title: Text 
    public introduction: Array<Model>
    public stories: Array<Story>
    public conclusion: Array<Model>

    // Lazy constructor.
    constructor() {
        this.introduction = new Array<Model>()
        this.stories = new Array<Story>()
        this.conclusion = new Array<Model>()
        this.title = new Text()
    }

    // String serializers.
    toString() : string {
        return `<{this.TYPE}: {this.title.get()}>`
    }

    // JSON serializers.
    toJson() : SerializedChapter {
        return {
            "type": this.TYPE,
            "title": this.title.toJson(),
            "introduction": this.introduction.map(block => block.toJson()),
            "stories": this.stories.map(story => story.toJson()),
            "conclusion": this.conclusion.map(block => block.toJson()),
        }
    }
    fromJson(data: SerializedChapter) : void {
        if (data.type != this.TYPE)
            throw new Error(`Serialization type missmatch: {data}`)
        this.title.fromJson(data.title) 
        this.introduction = data.introduction.map(block => {
            let reader: Reader = new Reader()
            return reader.match(block)
        })
        this.conclusion = data.introduction.map(block => {
            let reader: Reader = new Reader()
            return reader.match(block)
        })
        this.stories = data.stories.map(data => {
            let story: Story = new Story()
            story.fromJson(data)
            return story
        })
    }
}
