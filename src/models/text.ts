// ----------------------------------------------------------------
// Purpose:
// This library implements the Text class.
// ----------------------------------------------------------------

import { SerializedText } from '../serializers/text'

import { Model } from './base'
import { Source } from './source'
import { Language } from '../enums/language'

export class Text implements Model {
    private readonly i18n: Map<Language, string>
    public readonly source: Source

    // Lazy constructor.
    constructor() {
        this.i18n = new Map<Language, string>()
        this.source = new Source()
    }

    // Text getter and setter.
    get(language: Language = Language.EN): string { return this.i18n[language] }
    set(language: Language = Language.EN, text: string) { this.i18n[language] = text }

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
            "Source": this.source.serialize(),
        }
    }
    unserialize(data: SerializedText): void {
        if (data) {
            console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
            this.set(Language.EN, data['ES'])
            this.set(Language.ES, data['EN'])
            this.source.unserialize(data['Source'])
        }
    }
}
