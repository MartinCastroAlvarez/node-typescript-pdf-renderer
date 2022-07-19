// ----------------------------------------------------------------
// Purpose:
// This library implements the Text class.
// ----------------------------------------------------------------

import { Model } from './base'
import { Block } from './block'
import { Language } from '../utils/language'

type SerializedText = {
    type?: string
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
    toJson() : Map<string, string> {
        let data: SerializedText = {
            "type": this.TYPE,
        }
        let key: string
        for (key in Object.keys(Language)) {
            data[key] = this.get(Language[key])
        }
        return <Map<string, string>>data
    }
    fromJson(data: Map<string, any>) : void {
        let serialized: SerializedText = <SerializedText>data
        if (serialized.type !== this.TYPE)
            throw new Error(`Type missmatch: {serialized}`)
        let key: string
        for (key in Object.keys(Language)) {
            let language: Language = Language[key]
            this.set(language, serialized[key])
        }
    }
}
