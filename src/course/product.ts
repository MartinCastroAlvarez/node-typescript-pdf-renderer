// ----------------------------------------------------------------
// Purpose:
// This class implements the Course Product class.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Product } from '../interfaces/product'

import { Book } from '../models/book'

import { Yaml } from '../yaml'
import { Tree } from '../tree'

import { Config } from '../config'
import { Log } from '../logging'

import { InvalidLanguageError } from '../errors/product'

export class Course implements Product {
    private language: Language
    private book: Book
    public readonly sections: Array<Product>

    constructor() {
        this.book = new Book()
        this.sections = new Array<Product>()
        this.language = Language.EN
    }   

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

    // Building product and all its sections.
    public build(): void {
        throw Error("Not Implemented")
    }

    // Rending product.
    public render(path: string): void {
        throw Error("Not Implemented")
    }
}
