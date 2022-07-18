// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Language } from 'language'
import { List } from './list'
import { Story } from './story'

export astract class Chapter {
    private title: string
    private language: Language

    public introduction: List<Content>
    public stories: List<Story>
    public conclusion: List<Content>

    // Title getter & setter.
    setTitle(title: string) : void { this.title = title }
    getTitle() : string { return this.title }
}
