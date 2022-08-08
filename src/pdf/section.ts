// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF Product class.
//
// References:
// - https://pdfkit.org/
// - https://www.clearlingo.co.nz/blog/how-to-order-the-pages-of-a-book
// ----------------------------------------------------------------

const PDFDocument = require('pdfkit');

import { Language } from '../enums/language'

import { Section } from '../interfaces/section'

import { Book } from '../models/book'

import { Tree } from '../tree'

import { InvalidLanguageError } from '../errors/product'
import { FileAlreadyExistsError } from '../errors/tree'

import { Config } from '../config'
import { Log } from '../logging'

export class PdfSection implements Section {
    private language: Language = Language.EN
    private book: Book = new Book()
    private doc: any = new PDFDocument()

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

    // PDF-Specific getters.
    public getDocument(): any { return this.doc }
    public getWidth(): number { return this.doc.page.width }
    public getHeight(): number { return this.doc.page.height }
    public getInnerWidth(): number { return this.doc.page.width - Config.dimensions.getMargin() * 2 }
    public getInnerHeight(): number { return this.doc.page.height - Config.dimensions.getMargin() * 2 }

    // Rending product.
    public render(path: string): string {
        Log.info("Rendering product", this)
        const finalPath: string = Tree.join(path, `${this.getTitle()}.pdf`)
        if (Tree.exists(finalPath))
            throw new FileAlreadyExistsError(`File already exists: ${finalPath}`)
        this.getDocument().pipe(Tree.stream(finalPath))
        this.getDocument().flushPages()
        this.getDocument().end()
        return finalPath
    }

    // Section title.
    public getTitle(): string { return 'section' }

    // Building a new empty document.
    public build(): void {
        Log.info("Building section", this.getBook())
        this.doc = new PDFDocument({
            bufferPages: true,
            autoFirstPage: true,
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
                .text(this.getBook().title.get(this.getLanguage()))
        })
        this.doc.info.Title = this.getBook().title.get(this.getLanguage())
        this.doc.info.Author = Config.brand.getTitle()
    }
}
