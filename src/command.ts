// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

import { Language } from './utils/language'
import { Book } from './models/book'

import { Author } from './models/author'
import { Brand } from './models/brand'
import { Chapter } from './models/chapter'
import { Story } from './models/story'
import { List } from './models/list'
import { Proverb } from './models/proverb'
import { Definition } from './models/definition'
import { Quote } from './models/quote'
import { Text } from './models/text'

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

    // Parsing parameters from CLI arguments.
    constructor(params: Parameters) {
        this.title = params.title
        this.language = Language[params.language.toUpperCase()]
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
