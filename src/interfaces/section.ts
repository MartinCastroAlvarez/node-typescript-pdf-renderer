// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Language } from '../enums/language'
import { Book } from '../models/book'

export interface Section {
    build(): void
    getLanguage(): Language
    setLanguage(language: Language)
    getBook(): Book
    setBook(book: Book)
}
