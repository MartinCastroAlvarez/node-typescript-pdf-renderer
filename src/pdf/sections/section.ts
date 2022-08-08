// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

const PDFDocument = require('pdfkit')

import { Language } from '../../enums/language'

import { Section } from '../../interfaces/section'

import { Book } from '../../models/book'

import { Config } from '../../config'
import { Log } from '../../logging'

export abstract class PdfSection implements Section {
    private doc: any
    private book: Book
    private language: Language

    constructor() {
        this.book = new Book()
        this.language = Language.EN
    }

    public build(): void {
        Log.info("Building section", this.getBook())
        this.doc = new PDFDocument({
            bufferPages: true,
            // autoFirstPage: true,
            size: 'A4',
            margins: {
                top: Config.dimensions.getMargin(),
                bottom: Config.dimensions.getMargin(),
                left: Config.dimensions.getMargin(),
                right: Config.dimensions.getMargin(),
            }
        })
        this.doc.on('pageAdded', () => {
            this.doc 
                .font(Config.typeface.getBold())
                .text(this.getPageTitle())
        })
        this.doc.info.Title = this.getPageTitle()
        this.doc.info.Author = Config.brand.getTitle()
    }

    // Returns the title of the book for each page.
    private getPageTitle(): string {
        return `${this.getBook().title.get(this.getLanguage())} - ${Config.brand.getTitle()}`
    }

    // Language getter and setter.
    public getLanguage(): Language { return this.language }
    public setLanguage(language: Language) { this.language = language }

    public getDocument(): any { return this.doc }
    public getWidth(): number { return this.doc.page.width }
    public getHeight(): number { return this.doc.page.height }
    public getInnerWidth(): number { return this.doc.page.width - Config.dimensions.getMargin() * 2 }
    public getInnerHeight(): number { return this.doc.page.height - Config.dimensions.getMargin() * 2 }

    // Book getter and setter.
    getBook(): Book { return this.book }
    setBook(book: Book) { this.book = book }
}
