// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Language } from './language'
import { List } from './list'
import { Story } from './story'

export abstract class Chapter {
    private title: string
    private language: Language

    public introduction: List<Content>
    public stories: List<Story>
    public conclusion: List<Content>

    // Lazy constructor.
    constructor() {
        this.introduction = new List<Content>()
        this.stories = new List<Story>()
        this.conclusion = new List<Content>()
        this.language = Language.EN
        this.title = ''
    }

    // Title getter & setter.
    setTitle(title: string) : void { this.title = title }
    getTitle() : string { return this.title }

    // Language getter & setter.
    setLanguage(language: Language) : void { this.language = language }
    getLanguage() : Language { return this.language }
}
