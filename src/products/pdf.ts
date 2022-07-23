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

import { SerializedBook } from '../serializers/book'

import { Yaml } from '../yaml'
import { Tree } from '../tree'

import { InvalidLanguageError } from '../errors/product'
import { InvalidTitleError } from '../errors/product'

import { Config } from '../config'
import { Log } from '../logging'

export class Pdf implements Product {
    private title: string
    private language: Language
    public readonly book: Book

    constructor() {
        this.book = new Book()
        this.title = ''
        this.language = Language.EN
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) {
        if (!title)
            throw new InvalidTitleError('Invalid title!')
        this.title = title
    }

    // Language getter and setter.
    getLanguage(): Language { return this.language }
    setLanguage(language: Language) {
        if (!language)
            throw new InvalidLanguageError('Invalid language!')
        this.language = language
    }

    // Loading book from YAML files.
    public load(): void {
        this.book.unserialize(<SerializedBook>Yaml.read(`@books/${this.getTitle()}.yaml`))
    }

    // Public PDF directory.
    public getPath(): string {
        return Tree.join(
            Tree.join(
                Tree.join(Tree.builds, this.getTitle()),
                "pdf",
            ),
            this.getLanguage(),
        )
    }

    // Rendering the final product.
    public render(): void {
        Tree.create(this.getPath())
        this.merge(
            [
                this.getBeginning(),
                this.getLegal(),
                this.getTableOfContents(),
                this.getAcknowledgement(),
                this.getForeword(),
                ...this.book.chapters.map(chapter => this.getChapter(chapter)),
                this.getAfterword(),
                this.getEnding(),
            ],
            Tree.join(this.getPath(), 'final.pdf'),
        )
    }

    // Merging parts of the PDF.
    private merge(docs: Array<any>, path: string): void {
        Log.info("Merging documents", docs)
        const parts: Array<string> = docs.map((doc, index) => {
            Log.info("Processing document", index)
            return this.save(doc, index.toString())
        })
        merge(parts, path, error => {
            if (error) {
                Log.error("Failed to merge files", error)
            }
        })
    }

    // Creating a new PDF document.
    private init(): any {
        const doc: any = new PDFDocument({
            bufferPages: true,
            autoFirstPage: true,
            size: 'A4',
        })
        doc.on('pageAdded', () => {
            doc 
                .font(Config.typeface.getBold())
                .text(Config.brand.getTitle())
        })
        return doc
    }

    // Flushing document to the file system.
    private save(doc: any, name: string): string {
        let path = Tree.join(this.getPath(), `${name}.pdf`)
        Log.info("Saving doc", doc)
        Log.info("Saving into", path)
        doc.pipe(Tree.stream(path))
        doc.flushPages()
        doc.end()
        return path
    }

    // Rendering introduction.
    private getBeginning(): any {
        let doc: any = this.init()
        doc.text("FIXME: Beginning!") // FIXME
        Log.info("Beginning", doc)
        return doc
    }

    // Rendering TOC section.
    private getTableOfContents(): any {
        let doc: any = this.init()
        doc.text("FIXME: Table of Contents!") // FIXME
        Log.info("Table of Contents", doc)
        return doc
    }

    // Rendering legal text.
    private getLegal(): any {
        let doc: any = this.init()
        doc.text("FIXME: Legal!") // FIXME
        Log.info("Legal", doc)
        return doc
    }

    // Rendering acknowledgements text.
    private getAcknowledgement(): any {
        let doc: any = this.init()
        doc.text("FIXME: Acknoledgements!") // FIXME
        Log.info("Legal", doc)
        return doc
    }

    // Rendering foreword text.
    private getForeword(): any {
        let doc: any = this.init()
        doc.text("FIXME: Foreword!") // FIXME
        Log.info("Foreword", doc)
        return doc
    }

    // Rendering afterword text.
    private getAfterword(): any {
        let doc: any = this.init()
        doc.text("FIXME: Afterword!") // FIXME
        Log.info("Afterword", doc)
        return doc
    }

    // Rendering ending .
    private getEnding(): any {
        let doc: any = this.init()
        doc.text("FIXME: Ending!") // FIXME
        Log.info("Ending", doc)
        return doc
    }

    // Rendering chapter.
    private getChapter(chapter: Chapter): any {
        let doc: any = this.init()
        doc.text(chapter.title.get()) // FIXME
        Log.info("Chapter", doc)
        return doc
    }
}
