// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF Section class.
// ----------------------------------------------------------------

const PDFDocument = require('pdfkit');

import { Language } from '../enums/Language';

import { Section } from '../interfaces/Section';

import { Book } from '../models/Book';

import { Tree } from '../utils/Tree';

import { InvalidLanguageError } from '../errors/Product';
import { FileAlreadyExistsError } from '../errors/Tree';

import { Config } from '../Config';
import { Log } from '../utils/Logging';

export class PdfSection implements Section {
    private language: Language = Language.EN
    private book: Book = new Book()
    private doc: any = new PDFDocument()
    private pages: number = 0

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
    public getPages(): number { return this.pages }
    public getWidth(): number { return this.doc.page.width }
    public getHeight(): number { return this.doc.page.height }
    public getCurrentHorizontalPosition(): number { return this.doc.x }
    public getCurrentVerticalPosition(): number { return this.doc.y }
    public getMarginLeft(): number { return Config.dimensions.getMargin() }
    public getMarginRight(): number { return Config.dimensions.getMargin() }
    public getMarginTop(): number { return Config.dimensions.getMargin() }
    public getMarginBottom(): number { return Config.dimensions.getMargin() }
    public getInnerWidth(): number {
        return this.doc.page.width - this.getMarginLeft() - this.getMarginRight()
    }
    public getInnerHeight(): number {
        return this.doc.page.height - this.getMarginBottom() - this.getMarginTop()
    }

    // PDF-Specific setters.
    public addPage(): void { this.getDocument().addPage() }

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
    public getTitle(): string { return this.constructor.name }

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
        this.pages++
        this.doc.on('pageAdded', () => {
            this.pages++
            // FIXME
            // this.doc 
            //     .font(Config.typeface.getBold())
            //     .text(this.getBook().title.get(this.getLanguage()))
        })
        this.doc.info.Title = this.getBook().title.get(this.getLanguage())
        this.doc.info.Author = Config.brand.getTitle()
    }
}
