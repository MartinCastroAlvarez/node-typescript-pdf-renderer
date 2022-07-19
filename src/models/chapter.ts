// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { SerializedChapter } from '../serializers/chapter'

import { Model } from './base'
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
    toJson(): SerializedChapter {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.toJson(),
            "Introduction": this.introduction.map(block => block.toJson()),
            "Stories": this.stories.map(story => story.toJson()),
            "Conclusion": this.conclusion.map(block => block.toJson()),
        }
    }
    fromJson(data: SerializedChapter): void {
        this.title.fromJson(data['Title']) 
        this.introduction = data['Introduction'].map(block => {
            let yaml: Yaml = new Yaml()
            return yaml.load(block)
        })
        this.conclusion = data['Conclusion'].map(block => {
            let yaml: Yaml = new Yaml()
            return yaml.load(block)
        })
        this.stories = data['Stories'].map(data => {
            let story: Story = new Story()
            story.fromJson(data)
            return story
        })
    }
}
