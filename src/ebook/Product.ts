// ----------------------------------------------------------------
// PURPOSE:
// This class implements the PDF Product class.
//
// References:
// - https://pdfkit.org/
// - https://www.clearlingo.co.nz/blog/how-to-order-the-pages-of-a-book
// ----------------------------------------------------------------

const merge = require('easy-pdf-merge')

import { Product } from '../interfaces/Product'
import { Section } from '../interfaces/Section'

import { Tree } from '../utils/Tree'

import { RenderingError } from '../errors/Product'
import { FileAlreadyExistsError } from '../errors/Tree'

import { Log } from '../utils/Logging'

import { AcknowledgementsSection } from './sections/Acknowledgements'
import { AfterwordSection } from './sections/Afterword'
import { BackSection } from './sections/Back'
import { BibliographySection } from './sections/Bibliography'
import { BiographySection } from './sections/Biography'
import { ChapterSection } from './sections/Chapter'
import { TableOfContentsSection } from './sections/Contents'
import { CoverSection } from './sections/Cover'
import { ForewordSection } from './sections/Foreword'
import { LegalSection } from './sections/Legal'
import { TitleSection } from './sections/Title'

import { Context } from '../Context'

export class Ebook implements Product {
    public readonly sections: Array<Section> = new Array<Section>()

    // String serializer.
    public toString(): string { return `${this.constructor.name}` }

    // ----------------------------------------------------------------
    // Method responsible for merging all the sections in this
    // Product type and generating one single PDF.
    // ----------------------------------------------------------------
    public async merge(path: string): Promise<string> {
        Log.info("Merging product", this, Context.getBook())
        const finalPath: string = Tree.join(path, 'Final.pdf')
        if (Tree.exists(finalPath)) {
            throw new FileAlreadyExistsError(`File already exists: ${finalPath}`)
        }
        const parts: Array<string> = await Promise.all(
            this.sections.map(async (section) => await section.render(path))
        )
        return new Promise((resolve, reject) => {
            merge(parts, finalPath, error => {
                if (error) {
                    Log.error("Failed to merge files", error)
                    throw new RenderingError("Rendering failed!")
                } else {
                    Log.info("Merged doc files successfully", this.sections)
                }
            })
            Log.info("Product merged", this, Context.getBook())
            resolve(finalPath)
        })
    }

    // ----------------------------------------------------------------
    // Building product & all its sections.
    // ----------------------------------------------------------------
    public async build() {
        Log.info("Building PDF product", this, Context.getBook())

        // Cover section.
        const cover: CoverSection = new CoverSection()
        await cover.build()
        this.sections.push(cover)

        // Title section.
        const title: TitleSection = new TitleSection()
        await title.build()
        this.sections.push(title)

        // Legal section.
        const legal: LegalSection = new LegalSection()
        await legal.build()
        this.sections.push(legal)

        // Biography section.
        const biography: BiographySection = new BiographySection()
        await biography.build()
        this.sections.push(biography)

        // Table of Contents section.
        const contents: TableOfContentsSection = new TableOfContentsSection()
        await contents.build()
        this.sections.push(contents)

        // Acknowledgements section.
        if (Context.getBook().acknowledgements.length) {
            const acknowledgements: AcknowledgementsSection = new AcknowledgementsSection()
            await acknowledgements.build()
            this.sections.push(acknowledgements)
        }

        // Foreword section.
        const foreword: ForewordSection = new ForewordSection()
        await foreword.build()
        this.sections.push(foreword)

        // Chapters section.
        for (let chapter of Context.getBook().chapters) {
            const section: ChapterSection = new ChapterSection()
            section.setChapter(chapter)
            await section.build()
            this.sections.push(section)
        }

        // Afterword section.
        const afterword: AfterwordSection = new AfterwordSection()
        await afterword.build()
        this.sections.push(afterword)

        // Bibliography section.
        const bibliography: BibliographySection = new BibliographySection()
        await bibliography.build()
        this.sections.push(bibliography)

        // Back Cover section.
        const back: BackSection = new BackSection()
        await back.build()
        this.sections.push(back)

        // Index book.
        contents.index(this.sections.filter(section => section.getIndex()))

        // End of build.
        Log.info("PDF product built successfully", this, Context.getBook())
    }
}
