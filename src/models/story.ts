// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { Model } from './base'
import { Block } from './block'
import { Text } from './text'

export class Story {
    public title: Text
    public blocks: Array<Block>

    // Lazy constructor.
    constructor() {
        this.blocks = new Array<Block>()
        this.title = new Text()
    }
}
