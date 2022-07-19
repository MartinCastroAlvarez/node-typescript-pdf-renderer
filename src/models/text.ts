// ----------------------------------------------------------------
// Purpose:
// This library implements the Text class.
// ----------------------------------------------------------------

import { Model, Serializable } from './base'
import { Language } from '../utils/language'

export interface SerializedText extends Serializable {
    en?: string
    es?: string
}

export class Text implements Model {
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
        return `<{(this as any).constructor.name}: {this.get()}>`
    }

    // JSON serializers.
    toJson() : SerializedText {
        return {
            "type": (this as any).constructor.name,
            "en": this.get(Language.EN),
            "es": this.get(Language.ES),
        }
    }
    fromJson(data: SerializedText) : void {
        this.set(Language.EN, data[Language.EN])
        this.set(Language.ES, data[Language.ES])
    }
}
