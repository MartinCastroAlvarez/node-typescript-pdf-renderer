// ----------------------------------------------------------------
// Purpose:
// This class implements the Video Product class.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Section } from '../interfaces/section'
import { Product } from '../interfaces/product'

import { Book } from '../models/book'

import { Yaml } from '../yaml'
import { Tree } from '../tree'

import { Config } from '../config'
import { Log } from '../logging'

import { InvalidLanguageError } from '../errors/product'

export class Video implements Product {
    private language: Language = Language.EN
    private book: Book = new Book()
    public readonly sections: Array<Section> = new Array<Section>()

    // Book getter and setter.
    getBook(): Book { return this.book }
    setBook(book: Book) { this.book = book }

    // Language getter and setter.
    getLanguage(): Language { return this.language }
    setLanguage(language: Language) {
        if (!language)
            throw new InvalidLanguageError('Invalid language!')
        this.language = language
    }

    // Returns the title of the book.
    public getTitle(): string {
        return `${this.getBook().title.get(this.getLanguage())} - ${Config.brand.getTitle()}`
    }

    // Building product and all its sections.
    public build(): void {
        throw Error("Not Implemented")
    }

    // Rending product.
    public render(path: string): string {
        throw Error("Not Implemented")
    }
}
