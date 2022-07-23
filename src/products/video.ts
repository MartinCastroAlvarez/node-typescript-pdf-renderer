// ----------------------------------------------------------------
// Purpose:
// This class implements the Video Product class.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Product } from '../interfaces/product'

import { Book } from '../models/book'

import { SerializedBook } from '../serializers/book'

import { Yaml } from '../yaml'

import { Config } from '../config'
import { Log } from '../logging'

import { InvalidLanguageError } from '../errors/product'
import { InvalidTitleError } from '../errors/product'

export class Video implements Product {
    private title: string
    private language: Language
    public readonly book: Book

    constructor() {
        this.book = new Book()
        this.title = ''
        this.language = Language.EN
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
        this.book.unserialize(<SerializedBook>Yaml.read(`@books/${this.getTitle()}.yaml`))
    }

    // Rendering.
    render(): string {
        return "FIXME"
    }
}
