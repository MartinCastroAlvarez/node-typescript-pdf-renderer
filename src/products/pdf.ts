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
    private sections: Array<Section>

    constructor() {
        this.book = new Book()
        this.sections = new Array<Section>()
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
        const finalPath: string = Tree.join(path, 'final.pdf')
        merge(parts, finalPath, error => {
            if (error) {
                Log.error("Failed to merge files", error)
                throw Error("Rendering failed!")
            } else
                Log.info("Merged doc files successfully", this.sections)
        })

    }

    // Building product & all its sections.
    public build(): void {
        Log.info("Building PDF product", this.getBook())

        // Cover section.
        const cover: CoverSection = new CoverSection()
        cover.setBook(this.getBook())
        cover.setLanguage(this.getLanguage())
        cover.build()
        this.sections.push(cover)

        // Title section.
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

        // About section.
        const about: AboutSection = new AboutSection()
        about.setBook(this.getBook())
        about.setLanguage(this.getLanguage())
        about.build()
        this.sections.push(about)

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

        // Foreword section.
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
}

abstract class Section {
    private doc: any
    private book: Book
    private language: Language

    constructor() {
        this.book = new Book()
        this.language = Language.EN
    }

    private getTitle(): string {
        return `${this.getBook().title.get(this.getLanguage())} - ${Config.brand.getTitle()}`
    }

    public build(): void {
        Log.info("Building section", this.getBook())
        this.doc = new PDFDocument({
            bufferPages: true,
            autoFirstPage: true,
            // font: Config.typeface.getBold(), // FIXME
            size: 'A4',
        })
        this.doc.on('pageAdded', () => {
            this.doc 
                .font(Config.typeface.getBold())
                .text(this.getTitle())
        })
        /*
        this.doc.info.Title = 
        this.doc.info.Author = 
        this.doc.info.Subject = this
        this.doc.info.MonDate = 
        */
    }

    // Language getter and setter.
    getLanguage(): Language { return this.language }
    setLanguage(language: Language) { this.language = language }

    public getDocument(): any { return this.doc }

    // Book getter and setter.
    getBook(): Book { return this.book }
    setBook(book: Book) { this.book = book }
}

class ChapterSection extends Section {
    protected chapter: Chapter

    constructor() {
        super()
        this.chapter = new Chapter()
    }

    // Book getter and setter.
    getChapter(): Chapter { return this.chapter }
    setChapter(chapter: Chapter) { this.chapter = chapter }

    public build(): void {
        super.build()
        Log.info("Building chapter", this.getChapter())
        this.getDocument().text('Chapter') // FIXME
    }
}

class CoverSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())
        this.getDocument().text('Lorem Ipsum') // FIXME
    }
}

class TitleSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())
        this.getDocument().text('Title') // FIXME
    }
}

class LegalSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())
        this.getDocument().text('Legal') // FIXME
    }
}

class AboutSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book about section", this.getBook())
        this.getDocument().text('About') // FIXME
    }
}

class AcknowledgementsSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book acknowledgements section", this.getBook())
        this.getDocument().text('Acknowledgements') // FIXME
    }
}

class ForewordSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book foreword section", this.getBook())
        this.getDocument().text('Forewords') // FIXME
    }
}

class AfterwordSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book afterword section", this.getBook())
        this.getDocument().text('Afterwords') // FIXME
    }
}

class BackSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book back cover", this.getBook())
        this.getDocument().text('Back') // FIXME
    }
}

class TableOfContentsSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book table of contents", this.getBook())
        this.getDocument().text('TableOfContents') // FIXME
    }
}
