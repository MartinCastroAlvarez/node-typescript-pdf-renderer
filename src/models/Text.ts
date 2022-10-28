// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Text class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedText } from '../serializers/Text'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Language } from '../enums/Language'

import { EmptynessError, TranslationError } from '../errors/Text'

export class Text implements Model {
    private readonly i18n: Map<Language, string> = new Map<Language, string>()

    // Text getter and setter.
    public get(language: Language = Language.EN): string {
        Log.info('Getting Text', language, this.i18n)
        if (this.i18n[Language.ALL]) {
            return this.i18n[Language.ALL]
        }
        if (!this.i18n[language]) {
            throw new TranslationError(`Not supported: ${typeof language} ${language}`)
        }
        return this.i18n[language]
    }
    public set(language: Language = Language.EN, text: string) {
        Log.info('Setting Text', language, text)
        if (!text) {
            throw new EmptynessError(`Invalid '${language}' text: ${text}`)
        }
        this.i18n[language] = text
    }
    public isEmpty(language: Language = Language.EN): boolean {
        return !this.i18n[Language.ALL] && !this.i18n[language]
    }

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.get()}>`
    }

    // ----------------------------------------------------------------
    // PREPROCESSING STEP:
    // Preprocessing simply refers to perform series of operations to
    // transform or change data and cache the results before actually
    // using them. That includes:
    // - Data Cleaning.
    // - Dimensionality Reduction.
    // - Feature Engineering.
    // - Sampling Data.
    // - Data Transformation.
    // - Imbalanced Data.
    // ----------------------------------------------------------------
    public build(): Promise<void> {
        Log.info('Preprocessing Text', this)
        return new Promise((resolve, reject) => resolve())
        Log.info('Text preprocessed successfully', this)
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedText {
        return {
            "Type": (this as any).constructor.name,
            "EN": this.get(Language.EN),
            "ES": this.get(Language.ES),
        }
    }
    public deserialise(data: SerializedText): void {
        if (data) {
            Log.info('Unserialising Text', data)
            if (data.ALL) {
                this.set(Language.ALL, data.ALL)
            } else {
                this.set(Language.EN, data.EN)
                this.set(Language.ES, data.ES)
            }
        }
    }
}
