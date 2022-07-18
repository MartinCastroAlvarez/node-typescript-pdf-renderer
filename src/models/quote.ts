// ----------------------------------------------------------------
// Purpose:
// This library implements the Qupte class.
// ----------------------------------------------------------------

import { Author } from './author'
import { Content } from './content'
import { Text } from './text'

export class Quote implements Content {
    public text: Text
    public author: Author

    // Lazy constructor.
    constructor() {
        this.text = new Text()
        this.author = new Author()
    }
}
