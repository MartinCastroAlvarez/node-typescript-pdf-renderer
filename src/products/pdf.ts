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
        this.sections.push(new CoverSection())
        this.sections.push(new TitleSection())
        this.sections.push(new LegalSection())
        this.sections.push(new AboutSection())
        this.sections.push(new AcknowledgementsSection())
        this.sections.push(new ForewordSection())
        for (let chapter of this.getBook().chapters) {
            this.sections.push(new ChapterSection())
        }
        this.sections.push(new AfterwordSection())
        this.sections.push(new BackSection())
        this.sections.push(new TableOfContentsSection())
    }
}

export class Section {
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

export class CoverSection extends Section {
    constructor() {
        super()
        this.doc.text('Lorem Ipsum') // FIXME
    }
}

export class TitleSection extends Section {
    constructor() {
        super()
        this.doc.text('Title') // FIXME
    }
}

export class LegalSection extends Section {
    constructor() {
        super()
        this.doc.text('Legal') // FIXME
    }
}

export class AboutSection extends Section {
    constructor() {
        super()
        this.doc.text('About') // FIXME
    }
}

export class AcknowledgementsSection extends Section {
    constructor() {
        super()
        this.doc.text('Acknowledgements') // FIXME
    }
}

export class ForewordSection extends Section {
    constructor() {
        super()
        this.doc.text('Forewords') // FIXME
    }
}

export class AfterwordSection extends Section {
    constructor() {
        super()
        this.doc.text('Afterwords') // FIXME
    }
}

export class BackSection extends Section {
    constructor() {
        super()
        this.doc.text('Back') // FIXME
    }
}

export class TableOfContentsSection extends Section {
    constructor() {
        super()
        this.doc.text('TableOfContents') // FIXME
    }
}

export class ChapterSection extends Section {
    constructor() {
        super()
        this.doc.text('Chapter') // FIXME
    }
}
