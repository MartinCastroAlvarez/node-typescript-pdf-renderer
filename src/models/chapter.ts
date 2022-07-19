// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { Model } from './base'
import { Block } from './block'
import { Text } from './text'
import { Story } from './story'

export class Chapter implements Model {
    public title: Text 
    public introduction: Array<Block>
    public stories: Array<Story>
    public conclusion: Array<Block>

    // Lazy constructor.
    constructor() {
        this.introduction = new Array<Block>()
        this.stories = new Array<Story>()
        this.conclusion = new Array<Block>()
        this.title = new Text()
    }
}
