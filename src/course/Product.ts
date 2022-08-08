// ----------------------------------------------------------------
// Purpose:
// This class implements the Course Product class.
// ----------------------------------------------------------------

import { Language } from '../enums/Language'

import { Section } from '../interfaces/Section'
import { Product } from '../interfaces/Product'

import { Book } from '../models/Book'

import { Yaml } from '../Yaml'
import { Tree } from '../Tree'

import { Config } from '../Config'
import { Log } from '../Logging'

import { InvalidLanguageError } from '../errors/Product'

export class Course implements Product {
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
