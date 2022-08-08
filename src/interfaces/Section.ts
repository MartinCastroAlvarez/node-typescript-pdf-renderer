// ----------------------------------------------------------------
// Purpose:
// This class implements the Section interface.
// ----------------------------------------------------------------

import { Language } from '../enums/Language'

import { Book } from '../models/Book'

export interface Section {
    getTitle(): string
    getBook(): Book
    setBook(book: Book): void
    getLanguage(): Language
    setLanguage(language: Language): void
    build(): void
    render(path: string): string
}
