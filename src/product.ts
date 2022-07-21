// ----------------------------------------------------------------
// Purpose:
// This class implements the Product class.
// ----------------------------------------------------------------

import { Language } from './enums/language'
import { Config } from './config'
import { Yaml } from './yaml'

interface Render {
    title: string
    language: string
}

export class Product {
    private title: string
    private language: Language
    public readonly config: Config
    public readonly book: Book

    constructor() {
        this.title = ''
        this.language = Language.EN
        this.config = new Config()
        this.book = new Book()
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) { this.title = title }

    // Language getter and setter.
    getLanguage(): Language { return this.language }
    setLanguage(language: Language) { this.language = language }

    // Loading Book from YAML
    load(name: string): void {
        // TODO
        /*
        render(params: Parameters): void {
            language = Language[params.language.toUpperCase()]
            if (!language)
                throw new Error('Invalid language!')
            if (!params.title.length || params.title.length > 30)
                throw new Error('Invalid title!')
            let product: Product = new Product()
            let path: string = product.render(language)
            console.log(`Book rendered into: ${path}`)
        }
        */
    }

    // Rendering PDF.
    toPdf(): string {
        return "TODO"
    }

    // Rendering Video.
    toVideo(): string {
        return "TODO"
    }

    // Rendering Course.
    toCourse(): string {
        return "TODO"
    }

}
