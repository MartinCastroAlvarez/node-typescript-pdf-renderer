// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Context class.
//
// CONTEXT SOFTWARE PATTERN:
// The goal of Context Object is not to pass lots of parameters to
// methods implicitly, as a means of by-passing strong typing and
// encapsulation. The goal is to store scoped data in a general,
// but managed way, independent of protocols and presentation technology.
// ----------------------------------------------------------------

import { Language } from './enums/Language'

import { Book } from './models/Book'

import { Product } from './interfaces/Product'
import { Api } from './interfaces/Api'
import { Section } from './interfaces/Section'

import { Log } from './utils/Logging'

import {
    BookContextError,
    LanguageContextError,
    ProductContextError,
    SectionContextError
} from './errors/Context'

export abstract class Context {
    private static language: Language
    private static book: Book
    private static section: Section
    private static product: Product

    // String serializers.
    public static toString(): string {
        return `<${Context.constructor.name}}>`
    }

    // ----------------------------------------------------------------
    // Product getter and setter.
    // ----------------------------------------------------------------
    public static getProduct(): Product {
        if (!Context.product) {
            throw new ProductContextError('No Product context found!')
        }
        return Context.product
    }
    public static setProduct(product: Product) {
        Log.info('Setting context product', product)
        Context.product = product
    }

    // ----------------------------------------------------------------
    // Section getter and setter.
    // ----------------------------------------------------------------
    public static getSection(): Section {
        if (!Context.section) {
            throw new SectionContextError('No Section context found!')
        }
        return Context.section
    }
    public static getApi(): Api {
        return Context.getSection().getApi()
    }
    public static setSection(section: Section) {
        Log.info('Setting context section', section)
        Context.section = section
    }

    // ----------------------------------------------------------------
    // Book getter and setter.
    // ----------------------------------------------------------------
    public static getBook(): Book {
        if (!Context.book) {
            throw new BookContextError('No Book context found!')
        }
        return Context.book
    }
    public static setBook(book: Book) {
        Log.info('Setting context book', book)
        Context.book = book
    }

    // ----------------------------------------------------------------
    // Language getter and setter.
    // ----------------------------------------------------------------
    public static getLanguage(): Language {
        if (!Context.language) {
            throw new LanguageContextError('No Language context found!')
        }
        return <Language>Context.language
    }
    public static setLanguage(language: Language) {
        Log.info('Setting context language', language)
        Context.language = <Language>language
    }
}
