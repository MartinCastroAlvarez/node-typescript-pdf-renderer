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
class InvalidTitleError extends Error {}
class WorkInProgressError extends Error {}

export class Product {
    private title: string
    private book: Book
    private language: Language
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
    }

    // Rendering PDF.
    toPdf(): string {
        console.log(`Book: ${JSON.stringify(this.book.serialize())}`)
        return "FIXME"
    }

    // Rendering Video.
    toVideo(): string {
        throw new WorkInProgressError('WIP')
        return "FIXME"
    }

    // Rendering Course.
    toCourse(): string {
        throw new WorkInProgressError('WIP')
        return "FIXME"
    }

    // Rendering HTML page.
    toHtml(): string {
        throw new WorkInProgressError('WIP')
        return "FIXME"
    }
}
