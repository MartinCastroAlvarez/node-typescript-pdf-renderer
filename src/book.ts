// ----------------------------------------------------------------
// Purpose:
// This library implements the Book class.
// ----------------------------------------------------------------

import { Chapter } from './chapter'
import { Content } from './content'
import { Language } from 'language'
import { List } from './list'

export class Book {
    private language: Language
    private title: string

    public chapters: List<Chapter>

    // Title getter & setter.
    setTitle(title: string) : void { this.title = title }
    getTitle() : string { return this.title }
}
