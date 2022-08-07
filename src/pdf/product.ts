// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF Product class.
//
// References:
// - https://pdfkit.org/
// - https://www.clearlingo.co.nz/blog/how-to-order-the-pages-of-a-book
// ----------------------------------------------------------------

const merge = require('easy-pdf-merge')

import { Language } from '../enums/language'

import { Product } from '../interfaces/product'
import { Section } from '../interfaces/section'

import { Book } from '../models/book'
import { Chapter } from '../models/chapter'

import { Tree } from '../tree'

import { InvalidLanguageError } from '../errors/product'
import { InvalidTitleError } from '../errors/product'

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

        // Info section.
        const info: TitleSection = new TitleSection()
        info.setBook(this.getBook())
        info.setLanguage(this.getLanguage())
        info.build()
        this.sections.push(info)

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
}
