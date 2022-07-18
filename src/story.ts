// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Language } from 'language'
import { List } from './list'

export astract class Story {
    private title: string
    private language: Language

    public content: List<Content>

    // Title getter & setter.
    setTitle(title: string) : void { this.title = title }
    getTitle() : string { return this.title }
}
