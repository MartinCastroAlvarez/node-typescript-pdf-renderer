// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF Product class.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

const PDFDocument = require('pdfkit')

import { Language } from '../enums/language'

import { Product } from '../interfaces/product'

import { Book } from '../models/book'

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
    load(): void {
        this.book.unserialize(<SerializedBook>Yaml.read(`@books/${this.getTitle()}.yaml`))
    }

    // Rendering.
    render(): string {
        Log.info("Lorem", this.book)

        // Initializing PDF document.
        let doc = new PDFDocument({
            bufferPages: true,
            autoFirstPage: true,
            size: 'A4',
        })

        // Writing PDF to the file system.
        let name: string = `${this.getTitle()}.pdf`
        let path: string = Tree.join(Tree.builds, name)
        doc.pipe(Tree.stream(path))
        doc.flushPages()
        doc.end()

        // Returning path.
        return path
    }
}
