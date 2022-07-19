// ----------------------------------------------------------------
// Purpose:
// This library implements the Text class.
// ----------------------------------------------------------------

import { Model, Serializable } from './base'
import { Block } from './block'
import { Language } from '../utils/language'

interface SerializedText extends Serializable {
    en?: string
    es?: string
}

export class Text implements Block, Model {
    public readonly TYPE: string = 'Text'

    private readonly i18n: Map<Language, string>

    // Lazy constructor.
    constructor() {
        this.i18n = new Map<Language, string>()
    }

    // Text getter and setter.
    get(language: Language = Language.EN) : string { return this.i18n[language] }
    set(language: Language = Language.EN, text: string) { this.i18n[language] = text }

    // String serializers.
    toString() : string {
        return `<{this.TYPE}: {this.get()}>`
    }

    // JSON serializers.
    toJson() : SerializedText {
        return {
            "type": this.TYPE,
            "en": this.get(Language.EN),
            "es": this.get(Language.ES),
        }
    }
    fromJson(data: SerializedText) : void {
        if (data.type != this.TYPE)
            throw new Error(`Serialization type missmatch: {data}`)
        this.set(Language.EN, data[Language.EN])
        this.set(Language.ES, data[Language.ES])
    }
}
