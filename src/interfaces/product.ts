// ----------------------------------------------------------------
// Purpose:
// This class implements the Product interface.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Book } from '../models/book'

export interface Product {
    getBook(): Book
    setBook(book: Book): void
    getLanguage(): Language
    setLanguage(language: Language): void
    build(): void
    render(path: string): void
}
