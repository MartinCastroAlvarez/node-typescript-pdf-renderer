// ----------------------------------------------------------------
// Purpose:
// This library implements the List class.
// ----------------------------------------------------------------

import { Block } from './block'
import { Text } from './text'

export class List implements Block, Model {
    public items: Array<Text>

    // Lazy constructor.
    constructor() {
        this.items = new Array<Text>()
    }
}
