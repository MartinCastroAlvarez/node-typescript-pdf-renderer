// ----------------------------------------------------------------
// Purpose:
// This class implements the Product class.
// ----------------------------------------------------------------

import { Language } from './enums/language'

import { SerializedBook } from './serializers/book'
import { Book } from './models/book'

import { Config } from './config'
import { Yaml } from './yaml'

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
    setLanguage(language: Language) { this.language = language }

    // Rendering PDF.
    toPdf(): string {
        if (!this.language)
            throw new Error('Invalid language!')
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
