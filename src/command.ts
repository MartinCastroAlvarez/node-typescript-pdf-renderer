// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

import { Format } from './enums/format'
import { Language } from './enums/language'

import { Arguments } from './interfaces/arguments'
import { Product } from './interfaces/product'

import { Book } from './models/book'
import { SerializedBook } from './serializers/book'

import { Pdf } from './pdf/product'
import { Html } from './html/product'
import { Video } from './video/product'
import { Course } from './course/product'

import { Yaml } from './yaml'
import { Tree } from './tree'
import { Log } from './logging'

import { NotImplementedError } from './errors/command'

export class Command {
    public static run(args: Arguments): void {

        // Initializing variables.
        let book: Book
        let product: Product
        let language: Language
        let format: Format
        let path: string

        // Loading Book from YAML.
        book = new Book()
        book.unserialize(<SerializedBook>Yaml.read(`@books/${args.title}.yaml`))

        // Iterating over each format.
        for (let f of args.format.split(",")) {
            format = Format[f.toUpperCase()]
            Log.info("Parsing format:", format)

            // Iterating over each language.
            for (let l of args.language.split(",")) {
                language = Language[l.toUpperCase()]
                Log.info("Parsing language:", language)

                // Creating a new product.
                if (format == Format.PDF)
                    product = new Pdf()
                else if (format == Format.HTML)
                    product = new Html()
                else if (format == Format.VIDEO)
                    product = new Video()
                else if (format == Format.COURSE)
                    product = new Course()
                else
                    throw new NotImplementedError(`Not implemented format!`)

                // Deciding path.
                path = Tree.join(
                    Tree.join(
                        Tree.join(
                            Tree.builds,
                            args.title.toLowerCase(),
                        ),
                        format.toLowerCase(),
                    ),
                    language.toLowerCase(),
                )
                Log.success('Rendering into', path)
                Tree.create(path)
                Tree.clean(path)

                // Renering product.
                product.setBook(book)
                product.setLanguage(language)
                product.build()
                product.merge()
                product.render(path)
                Log.success('Rendered into', path)
            }
        }
    }
}
