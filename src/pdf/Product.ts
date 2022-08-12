// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF Product class.
//
// References:
// - https://pdfkit.org/
// - https://www.clearlingo.co.nz/blog/how-to-order-the-pages-of-a-book
// ----------------------------------------------------------------

const merge = require('easy-pdf-merge')

import { Language } from '../enums/Language'

import { Product } from '../interfaces/Product'

import { Book } from '../models/Book'

import { Tree } from '../utils/Tree'

import { InvalidLanguageError, RenderingError } from '../errors/Product'
import { FileAlreadyExistsError } from '../errors/Tree'

import { Log } from '../utils/Logging'

import { PdfSection } from './Section'

import { Header } from './features/Header'

import { AcknowledgementsSection } from './sections/Acknowledgements'
import { AfterwordSection } from './sections/Afterword'
import { BiographySection } from './sections/Biography'
import { BackSection } from './sections/Back'
import { BibliographySection } from './sections/Bibliography'
import { ChapterSection } from './sections/Chapter'
import { TableOfContentsSection } from './sections/Contents'
import { CoverSection } from './sections/Cover'
import { ForewordSection } from './sections/Foreword'
import { LegalSection } from './sections/Legal'
import { TitleSection } from './sections/Title'

export class Pdf implements Product {
    private language: Language = Language.EN
    private book: Book = new Book()
    public readonly sections: Array<PdfSection> = new Array<PdfSection>()

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
        const finalPath: string = Tree.join(path, 'Final.pdf')
        if (Tree.exists(finalPath))
            throw new FileAlreadyExistsError(`File already exists: ${finalPath}`)
        const parts: Array<string> = this.sections.map(section => section.render(path))
        merge(parts, finalPath, error => {
            if (error) {
                console.log(error) // FIXME
                Log.error("Failed to merge files", error)
                throw new RenderingError("Rendering failed!")
            } else
                Log.info("Merged doc files successfully", this.sections)
        })
        return finalPath
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

        // Biography section.
        const biography: BiographySection = new BiographySection()
        biography.setBook(this.getBook())
        biography.setLanguage(this.getLanguage())
        biography.build()
        this.sections.push(biography)

        // Acknowledgements section.
        const acknowledgements: AcknowledgementsSection = new AcknowledgementsSection()
        acknowledgements.setBook(this.getBook())
        acknowledgements.setLanguage(this.getLanguage())
        acknowledgements.build()
        this.sections.push(acknowledgements)

        // Table of Contents section.
        const contents: TableOfContentsSection = new TableOfContentsSection()
        contents.setBook(this.getBook())
        contents.setLanguage(this.getLanguage())
        contents.build()
        this.sections.push(contents)

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

        // Bibliography section.
        const bibliography: BibliographySection = new BibliographySection()
        bibliography.setBook(this.getBook())
        bibliography.setLanguage(this.getLanguage())
        bibliography.build()
        this.sections.push(bibliography)

        // Back Cover section.
        const back: BackSection = new BackSection()
        back.setBook(this.getBook())
        back.setLanguage(this.getLanguage())
        back.build()
        this.sections.push(back)

        // Index book.
        contents.setSections(this.sections)
        contents.index()

        // Adding header to all pages.
        this.sections.filter(section => section.getHeader()).forEach(section => {
            const header: Header = new Header()
            header.setSection(section)
            header.apply()
        })

        // End of build.
        Log.info("PDF product built successfully", this.getBook())
    }
}
