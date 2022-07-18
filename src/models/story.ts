// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Text } from './text'

export class Story {
    public title: Text
    public content: Array<Content>

    // Lazy constructor.
    constructor() {
        this.content = new Array<Content>()
        this.title = new Text()
    }
}
