// ----------------------------------------------------------------
// Purpose:
// This library implements the Text class.
// ----------------------------------------------------------------

import { SerializedText } from '../serializers/Text'

import { Model } from '../interfaces/Model'

import { Log } from '../Logging'

import { Language } from '../enums/Language'

import { EmptynessError, TranslationError } from '../errors/Text'

export class Text implements Model {
    private readonly i18n: Map<Language, string> = new Map<Language, string>()

    // Text getter and setter.
    get(language: Language = Language.EN): string {
        if (!this.i18n[language])
            throw new TranslationError(`Not supported: ${language}`)
        return this.i18n[language]
    }
    set(language: Language = Language.EN, text: string) {
        if (!text)
            throw new EmptynessError(`Invalid '${language}' text: ${text}`)
        this.i18n[language] = text
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.get()}>`
    }

    // JSON serializers.
    serialize(): SerializedText {
        return {
            "Type": (this as any).constructor.name,
            "EN": this.get(Language.EN),
            "ES": this.get(Language.ES),
        }
    }
    unserialize(data: SerializedText): void {
        if (data) {
            Log.info('Loading Text', data)
            this.set(Language.EN, data['EN'])
            this.set(Language.ES, data['ES'])
        }
    }
}
