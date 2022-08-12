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
    public getPage(): any { return this.getDocument().page }
    public getPages(): number { return this.getDocument().bufferedPageRange().count }
    public getWidth(): number { return this.getPage().width }
    public getHeight(): number { return this.getPage().height }
    public getCurrentHorizontalPosition(): number { return this.getDocument().x }
    public getCurrentVerticalPosition(): number { return this.getDocument().y }
    public getMarginLeft(): number { return this.getPage().margins.left }
    public getMarginRight(): number { return this.getPage().margins.right }
    public getMarginTop(): number { return this.getPage().margins.top }
    public getMarginBottom(): number { return this.getPage().margins.bottom }
    public getInnerWidth(): number {
        return this.getPage().width - this.getMarginLeft() - this.getMarginRight()
    }
    public getInnerHeight(): number {
        return this.getPage().height - this.getMarginBottom() - this.getMarginTop()
    }

    // PDF-Specific setters.
    public addPage(): void { this.getDocument().addPage() }
    public addUnnumberedPage(): void {
        this.getDocument().addPage()
        this.getPage().unnumbered = true
   }
    public goTo(page: number): void { this.getDocument().switchToPage(page) }
    public setMarginLeft(margin: number): void { this.getPage().margins.left = margin }
    public setMarginRight(margin: number): void { this.getPage().margins.right = margin }
    public setMarginTop(margin: number): void { this.getPage().margins.top = margin }
    public setMarginBottom(margin: number): void { this.getPage().margins.bottom = margin }
    public resetMarginLeft(): void { this.getPage().margins.left = Config.dimensions.getMargin() }
    public resetMarginRight(): void { this.getPage().margins.right = Config.dimensions.getMargin() }
    public resetMarginTop(): void { this.getPage().margins.top = Config.dimensions.getMargin() }
    public resetMarginBottom(): void { this.getPage().margins.bottom = Config.dimensions.getMargin() }

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
        this.doc.on('pageAdded', () => {
            // FIXME
            // this.doc 
            //     .font(Config.typeface.getBold())
            //     .text(this.getBook().title.get(this.getLanguage()))
        })
        this.doc.info.Title = this.getBook().title.get(this.getLanguage())
        this.doc.info.Author = Config.brand.getTitle()
    }
}
