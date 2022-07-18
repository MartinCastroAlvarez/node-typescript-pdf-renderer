// ----------------------------------------------------------------
// Purpose:
// This library implements the Story class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Language } from './language'
import { List } from './list'

export abstract class Story {
    private title: string
    private language: Language

    public content: List<Content>

    // Lazy constructor.
    constructor() {
        this.content = new List<Content>()
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
