// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

const readYamlFile = require('read-yaml-file')
const PDFDocument = require('pdfkit')
const path = require('path')
const fs = require('fs')

import { Language } from './models/language'
import { Book } from './models/book'

// This interface is responsible for transforming the User input
// into a Typescript object, suitable for the Command class.
interface Parameters {
    title: string
    language: string
}

// The purpose of the Command class is to centralize the execution
// of the business classes defined in subdirectories here.
export class Command {
    private title: string
    private language: Language

    constructor(params: Parameters) {
        // Parsing parameters from CLI arguments.
        this.title = params.title
        this.language = Language[params.language]
    }

    run() : void {
        // Main hook.
        let book : Book = new Book()
        console.log('Success!')
    }
}
