// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF Product class.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

const PDFDocument = require('pdfkit')
const merge = require('easy-pdf-merge')

import { Language } from '../enums/language'

import { Product } from '../interfaces/product'

import { Book } from '../models/book'
import { Chapter } from '../models/chapter'

import { Yaml } from '../yaml'
import { Tree } from '../tree'

import { InvalidLanguageError } from '../errors/product'
import { InvalidTitleError } from '../errors/product'

import { Config } from '../config'
import { Log } from '../logging'

export class Pdf implements Product {
    private language: Language
    private book: Book
    private sections: Array<Document>

    constructor() {
        this.book = new Book()
        this.sections = new Array<Document>()
        this.language = Language.EN
    }

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
    public render(path: string): void {
        Log.info("Merging sections", this.sections)
        const parts: Array<string> = this.sections.map((section, index) => {
            const partPath: string = Tree.join(path, `part-${index + 1}.pdf`)
            Log.info("Saving section", section)
            Log.info("Saving into", partPath)
            section.getDocument().pipe(Tree.stream(partPath))
            section.getDocument().flushPages()
            section.getDocument().end()
            return partPath
        })
        const final: string = Tree.join(path, 'final.pdf')
        merge(parts, path, error => {
            if (error)
                Log.error("Failed to merge files", error)
            else
                Log.info("Merged doc files successfully", this.sections)
        })

    }

    // Building product & all its sections.
    public build(): void {
        this.sections.push(new Cover())

        /*
        this.getBeginning(),
        this.getLegal(),
        this.getAbout(),
        this.getTableOfContents(),
        this.getAcknowledgement(),
        this.getForeword(),
        ...this.book.chapters.map(chapter => this.getChapter(chapter)),
        this.getAfterword(),
        this.getEnding(),
       */
    }
}

export class Document {
    protected doc: any

    constructor() {
        this.doc = new PDFDocument({
            bufferPages: true,
            autoFirstPage: true,
            size: 'A4',
        })
        this.doc.on('pageAdded', () => {
            this.doc 
                .font(Config.typeface.getBold())
                .text(Config.brand.getTitle())
        })
    }

    public getDocument(): any { return this.doc }
}

export class Cover extends Document {
    constructor() {
        super()
        this.doc.text('Lorem Ipsum')
    }
}
