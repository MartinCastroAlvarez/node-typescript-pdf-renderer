// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF Product class.
//
// References:
// - https://pdfkit.org/
// - https://www.clearlingo.co.nz/blog/how-to-order-the-pages-of-a-book
// ----------------------------------------------------------------

const merge = require('easy-pdf-merge')
const PDFDocument = require('pdfkit');

import { Language } from '../enums/language'

import { Product } from '../interfaces/product'

import { Book } from '../models/book'
import { Chapter } from '../models/chapter'

import { Tree } from '../tree'

import { InvalidLanguageError } from '../errors/product'
import { RenderingError } from '../errors/product'
import { FileAlreadyExistsError } from '../errors/tree'

import { Config } from '../config'
import { Log } from '../logging'

import { AcknowledgementsSection } from './sections/acknowledgements'
import { TableOfContentsSection } from './sections/contents'
import { AfterwordSection } from './sections/afterword'
import { ForewordSection } from './sections/foreword'
import { AuthorsSection } from './sections/authors'
import { ChapterSection } from './sections/chapter'
import { CoverSection } from './sections/cover'
import { TitleSection } from './sections/title'
import { LegalSection } from './sections/legal'
import { BackSection } from './sections/back'

export class Pdf implements Product {
    private language: Language = Language.EN
    private book: Book = new Book()
    public readonly sections: Array<Product> = new Array<Product>()

    private doc: any = new PDFDocument({
        bufferPages: true,
        autoFirstPage: false,
        size: 'A4',
        margins: {
            top: Config.dimensions.getMargin(),
            bottom: Config.dimensions.getMargin(),
            left: Config.dimensions.getMargin(),
            right: Config.dimensions.getMargin(),
        }
    })

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

    // Rending product.
    public render(path: string): string {
        Log.info("Rendering product", this)
        const finalPath: string = `${(this as any).constructor.name}.pdf`
        if (Tree.exists(finalPath))
            throw new FileAlreadyExistsError(`File already exists: {finalPath}`)
        if (this.sections.length) {
            const parts: Array<string> = this.sections.map(section => section.render(path))
            merge(parts, finalPath, error => {
                if (error) {
                    Log.error("Failed to merge files", error)
                    throw new RenderingError("Rendering failed!")
                } else
                    Log.info("Merged doc files successfully", this.sections)
            })
        } else {
            this.getDocument().pipe(Tree.stream(finalPath))
            this.getDocument().flushPages()
            this.getDocument().end()
        }
        return finalPath
    }

    // Building product & all its sections.
    public merge(): void {
        Log.info("Building PDF product", this.getBook())

        // Cover section.
        const cover: CoverSection = new CoverSection()
        cover.setBook(this.getBook())
        cover.setLanguage(this.getLanguage())
        cover.build()
        this.sections.push(cover)

        // Info section.
        const title: TitleSection = new TitleSection()
        title.setBook(this.getBook())
        title.setLanguage(this.getLanguage())
        title.build()
        this.sections.push(title)

        // Legal section.
        const legal: LegalSection = new LegalSection()
        legal.setBook(this.getBook())
        legal.setLanguage(this.getLanguage())
        legal.build()
        this.sections.push(legal)

        // Authors section.
        const authors: AuthorsSection = new AuthorsSection()
        authors.setBook(this.getBook())
        authors.setLanguage(this.getLanguage())
        authors.build()
        this.sections.push(authors)

        // Acknowledgements section.
        const acknowledgements: AcknowledgementsSection = new AcknowledgementsSection()
        acknowledgements.setBook(this.getBook())
        acknowledgements.setLanguage(this.getLanguage())
        acknowledgements.build()
        this.sections.push(acknowledgements)

        // Foreword section.
        const foreword: ForewordSection = new ForewordSection()
        foreword.setBook(this.getBook())
        foreword.setLanguage(this.getLanguage())
        foreword.build()
        this.sections.push(foreword)

        // Chapters section.
        for (let chapter of this.getBook().chapters) {
            const section: ChapterSection = new ChapterSection()
            section.setChapter(chapter)
            section.setBook(this.getBook())
            section.setLanguage(this.getLanguage())
            section.build()
            this.sections.push(section)
        }

        // Afterword section.
        const afterword: AfterwordSection = new AfterwordSection()
        afterword.setBook(this.getBook())
        afterword.setLanguage(this.getLanguage())
        afterword.build()
        this.sections.push(afterword)

        // Back Cover section.
        const back: BackSection = new BackSection()
        back.setBook(this.getBook())
        back.setLanguage(this.getLanguage())
        back.build()
        this.sections.push(back)

        // Table of Contents section.
        const contents: TableOfContentsSection = new TableOfContentsSection()
        contents.setBook(this.getBook())
        contents.setLanguage(this.getLanguage())
        contents.build()
        this.sections.splice(5, 0, contents)
    }

    // Building a new empty document.
    public build(): void {
        Log.info("Building section", this.getBook())

        this.doc.on('pageAdded', () => {
            this.doc 
                .font(Config.typeface.getBold())
                .text(this.getTitle())
        })
        this.doc.info.Title = this.getTitle()
        this.doc.info.Author = Config.brand.getTitle()
    }

    // Returns the title of the book.
    public getTitle(): string {
        return `${this.getBook().title.get(this.getLanguage())} - ${Config.brand.getTitle()}`
    }

    // PDF-Specific getters.
    public getDocument(): any { return this.doc }
    public getWidth(): number { return this.doc.page.width }
    public getHeight(): number { return this.doc.page.height }
    public getInnerWidth(): number { return this.doc.page.width - Config.dimensions.getMargin() * 2 }
    public getInnerHeight(): number { return this.doc.page.height - Config.dimensions.getMargin() * 2 }
}
