// ----------------------------------------------------------------
// PURPOSE:
// This class is the interface with the User to render the PDF.
//
// COMMAND SOFTWARE PATTERN:
// Command is a behavioral design pattern that turns a request
// into a stand-alone object that contains all information about
// the request. This transformation lets you pass requests as a
// method arguments, delay or queue a request’s execution, and
// support undoable operations.
// ----------------------------------------------------------------

import { Format } from './enums/Format'
import { Language } from './enums/Language'

import { Arguments } from './interfaces/Arguments'
import { Product } from './interfaces/Product'

import { Book } from './models/Book'
import { SerializedBook } from './serializers/Book'

import { Course } from './course/Product'
import { Ebook } from './ebook/Product'
import { Html } from './html/Product'
import { Video } from './video/Product'

import { Log } from './utils/Logging'
import { Tree } from './utils/Tree'
import { Yaml } from './utils/Yaml'

import { Context } from './Context'

import { NotImplementedError } from './errors/Command'

export class Command {
    public static async run(args: Arguments): Promise<void> {

        // Initializing variables.
        let book: Book
        let product: Product
        let language: Language
        let format: Format
        let path: string

        // Loading Book from YAML.
        book = new Book()
        book.deserialise(<SerializedBook>Yaml.read(`@books/${args.title}.yaml`))
        Context.setBook(book)

        // Iterating over each format.
        args.format.split(",").forEach(async f => {
            format = Format[f.toUpperCase()]
            Log.info("Parsing format:", format)

            // Iterating over each language.
            args.language.split(",").forEach(async l => {
                language = Language[l.toUpperCase()]
                Log.info("Parsing language:", language)
                Context.setLanguage(language)

                // Pre-processing step.
                await book.build()

                // Deciding path.
                path = Tree.join(
                    Tree.builds,
                    args.title.toLowerCase(),
                    format.toLowerCase(),
                    language.toLowerCase(),
                )
                Log.info('Rendering into', path)
                Tree.create(path)
                Tree.clean(path)

                // Creating a new product.
                if (format === Format.EBOOK) {
                    product = new Ebook()
                }
                else if (format === Format.HTML) {
                    product = new Html()
                }
                else if (format === Format.VIDEO) {
                    product = new Video()
                }
                else if (format === Format.COURSE) {
                    product = new Course()
                }
                else {
                    throw new NotImplementedError(`Not implemented format!`)
                }

                // Building product.
                Context.setProduct(product)
                try {
                    await product.build()
                    await product.merge(path)
                    Log.success('Rendered into', path)
                } catch(error) {
                    Log.error('Failed to render', error)
                }

            })

        })

    }
}
