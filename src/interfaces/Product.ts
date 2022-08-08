// ----------------------------------------------------------------
// Purpose:
// This class implements the Product interface.
// ----------------------------------------------------------------

import { Language } from '../enums/Language'

import { Book } from '../models/Book'

import { Section } from './Section'

export interface Product {
    sections: Array<Section>
    getBook(): Book
    setBook(book: Book): void
    getLanguage(): Language
    setLanguage(language: Language): void
    build(): void
    render(path: string): string
}
