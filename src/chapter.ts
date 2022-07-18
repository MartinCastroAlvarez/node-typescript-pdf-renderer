// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Text } from './text'
import { Story } from './story'

export class Chapter {
    public title: Text 
    public introduction: Array<Content>
    public stories: Array<Story>
    public conclusion: Array<Content>

    // Lazy constructor.
    constructor() {
        this.introduction = new Array<Content>()
        this.stories = new Array<Story>()
        this.conclusion = new Array<Content>()
        this.title = new Text()
    }
}
