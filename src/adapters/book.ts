// ----------------------------------------------------------------
// Purpose:
// This library renders the book in a PDF.
//
// Parts of a book:
// - Book Cover
// - Title Page
// - Copyright
// - Table of Contents
// - Dedication
// - Foreword
// - Prologue
// - Epilogue
// - Epigraph
// - Book introduction
// - Inciting incident
// - Sections of a book
// - Act structure
// - First slap
// - Second slap
// - Climax
// - Acknowledgements
// - Author bio
// - Coming soon / Read more
// - Synopsis
// ----------------------------------------------------------------

import PDFDocument from 'pdfkit'

import { Book } from '../models/book'

export class BookAdapter {
    public book: Book

    // Lazy constructor.
    constructor() {
        this.book = new Book()
    }

    // 
    render(doc: PDFDocument) {
    }
}
