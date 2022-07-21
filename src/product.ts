// ----------------------------------------------------------------
// Purpose:
// This class implements the Product class.
// ----------------------------------------------------------------

import { Language } from './enums/language'

import { SerializedBook } from './serializers/book'
import { Book } from './models/book'

import { Config } from './config'
import { Yaml } from './yaml'

class InvalidLanguageError extends Error {}

interface Render {
    title: string
    language: string
}

export class Product {
    private book: Book 
    private language: Language
    public readonly config: Config

    constructor() {
        this.book = new Book()
        this.language = Language.EN
        this.config = new Config()
    }

    // Title getter and setter.
    setTitle(title: string) {
        let yaml: Yaml = new Yaml()
        this.book.unserialize(<SerializedBook>yaml.read(`@books/${title}.yaml`))
    }

    // Language getter and setter.
    getLanguage(): Language { return this.language }
    setLanguage(language: Language) {
        if (!language)
            throw new InvalidLanguageError('Invalid language!')
        this.language = language
    }

    // Rendering PDF.
    toPdf(): string {
        console.log(`Book: ${JSON.stringify(this.book.serialize())}`)
        return "TODO"
    }

    // Rendering Video.
    toVideo(): string {
        return "TODO"
    }

    // Rendering Course.
    toCourse(): string {
        return "TODO"
    }

}
