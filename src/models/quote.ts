// ----------------------------------------------------------------
// Purpose:
// This library implements the Qupte class.
// ----------------------------------------------------------------

import { Author } from './author'
import { Model } from './base'
import { Block } from './block'
import { Model } from './base'
import { Text } from './text'

export class Quote implements Block, Content {
    public text: Text
    public author: Author

    // Lazy constructor.
    constructor() {
        this.text = new Text()
        this.author = new Author()
    }
}
