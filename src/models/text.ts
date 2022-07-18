// ----------------------------------------------------------------
// Purpose:
// This library implements the Text class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Language } from './language'

export class Text implements Content {
    private content: Map<Language, string>

    // Lazy constructor.
    constructor() {
        this.content = new Map<Language, string>()
    }

    get(language: Language) : string {
        return this.content[language]
    }

    set(language: Language, text: string) {
        this.content[language] = text 
    }
}
