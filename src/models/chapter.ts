// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { SerializedChapter } from '../serializers/chapter'

import { Model } from './base'
import { Text } from './text'
import { Reader } from '../reader'
import { Story } from './story'

export class Chapter {
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
        return `<{(this as any).constructor.name}: {this.title.get()}>`
    }

    // JSON serializers.
    toJson() : SerializedChapter {
        return {
            "type": (this as any).constructor.name,
            "title": this.title.toJson(),
            "introduction": this.introduction.map(block => block.toJson()),
            "stories": this.stories.map(story => story.toJson()),
            "conclusion": this.conclusion.map(block => block.toJson()),
        }
    }
    fromJson(data: SerializedChapter) : void {
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
