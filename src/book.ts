// ----------------------------------------------------------------
// Purpose:
// This library implements the Book class.
// ----------------------------------------------------------------

import { Chapter } from './chapter'
import { Content } from './content'
import { Text } from './text'

export class Book {
    public title: Text
    public chapters: Array<Chapter>

    // Lazy constructor.
    constructor() {
        this.chapters = new Array<Chapter>()
        this.title = new Text()
    }
}
