// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

const readYamlFile = require('read-yaml-file')
const PDFDocument = require('pdfkit')
const path = require('path')
const fs = require('fs')

import { Language } from './utils/language'
import { Book } from './models/book'

// This interface is responsible for transforming the User input
// into a Typescript object, suitable for the Command class.
type Parameters = {
    title: string
    language: string
}

// The purpose of the Command class is to centralize the execution
// of the business classes defined in subdirectories here.
export class Command {
    private title: string
    private language: Language

    // Parsing parameters from CLI arguments.
    constructor(params: Parameters) {
        this.title = params.title
        this.language = Language[params.language]
    }

    // Validating input parameter.
    validate(): void {
        if (!this.language)
            throw new Error('Invalid language!')
        if (!this.title.length || this.title.length > 30)
            throw new Error('Invalid title!')
    }

    // Main hook.
    run() : void {
        this.validate()
        let book : Book = new Book()
        console.log('Success!')
    }
}
