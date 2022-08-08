// ----------------------------------------------------------------
// Purpose:
// This class implements the Section interface.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Book } from '../models/book'

export interface Section {
    getTitle(): string
    getBook(): Book
    setBook(book: Book): void
    getLanguage(): Language
    setLanguage(language: Language): void
    build(): void
    render(path: string): string
}
