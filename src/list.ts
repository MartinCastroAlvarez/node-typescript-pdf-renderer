// ----------------------------------------------------------------
// Purpose:
// This library implements the List class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Text } from './text'

export class List implements Content {
    public items: Array<Text>

    // Lazy constructor.
    constructor() {
        this.items = new Array<Text>()
    }
}
