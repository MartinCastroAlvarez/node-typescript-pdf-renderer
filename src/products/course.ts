// ----------------------------------------------------------------
// Purpose:
// This class implements the Course Product class.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Product } from '../interfaces/product'

import { Book } from '../models/book'

import { SerializedBook } from '../serializers/book'

import { Yaml } from '../yaml'

import { Config } from '../config'

class InvalidLanguageError extends Error {}
class InvalidTitleError extends Error {}

export class Course implements Product {
    private title: string
    private language: Language
    public readonly book: Book
    public readonly config: Config

    constructor() {
        this.book = new Book()
        this.title = ''
        this.language = Language.EN
        this.config = new Config()
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) {
        if (!title)
            throw new InvalidTitleError('Invalid title!')
        this.title = title
    }

    // Language getter and setter.
    getLanguage(): Language { return this.language }
    setLanguage(language: Language) {
        if (!language)
            throw new InvalidLanguageError('Invalid language!')
        this.language = language
    }

    // Loading book from YAML files.
    load(): void {
        let yaml: Yaml = new Yaml()
        this.book.unserialize(<SerializedBook>yaml.read(`@books/${this.getTitle()}.yaml`))
        this.config.load()
    }

    // Rendering.
    render(): string {
        console.log(`Book: ${JSON.stringify(this.book.serialize())}`)
        return "FIXME"
    }
}
