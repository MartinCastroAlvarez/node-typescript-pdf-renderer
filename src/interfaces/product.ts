// ----------------------------------------------------------------
// Purpose:
// This class implements the Product interface.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Book } from '../models/book'

export interface Product {
    book: Book
    getTitle(): string
    setTitle(title: string): void
    getLanguage(): Language
    setLanguage(language: Language): void
    load(): void
    render(): string
}
