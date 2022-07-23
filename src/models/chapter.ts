// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { SerializedChapter } from '../serializers/chapter'

import { Model } from '../interfaces/model'

import { Text } from './text'
import { Yaml } from '../yaml'
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
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // JSON serializers.
    serialize(): SerializedChapter {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialize(),
            "Introduction": this.introduction?.map(block => block.serialize()),
            "Stories": this.stories?.map(story => story.serialize()),
            "Conclusion": this.conclusion?.map(block => block.serialize()),
        }
    }
    unserialize(data: SerializedChapter): void {
        if (data) {
            console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
            let yaml: Yaml = new Yaml()
            this.title.unserialize(data['Title']) 
            this.introduction = data['Introduction']?.map(block => {
                console.log(`Loading chapter introduction.`)
                return yaml.unserialize(block)
            })
            this.conclusion = data['Conclusion']?.map(block => {
                console.log(`Loading chapter conclusion.`)
                return yaml.unserialize(block)
            })
            this.stories = data['Stories']?.map(data => {
                console.log(`Loading chapter stories.`)
                return <Story>yaml.unserialize(data)
            })
        }
    }
}
