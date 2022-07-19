// ----------------------------------------------------------------
// Purpose:
// This library implements the Text class.
// ----------------------------------------------------------------

import { Model } from './base'
import { Block } from './block'
import { Language } from '../utils/language'

export class Text implements Block, Model {
    private text: Map<Language, string>

    // Lazy constructor.
    constructor() {
        this.text= new Map<Language, string>()
    }

    // Text getter and setter.
    get(language: Language) : string { return this.text[language] }
    set(language: Language, text: string) { this.text[language] = text }
}
