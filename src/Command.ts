// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

import { Format } from './enums/Format'
import { Language } from './enums/Language'

import { Arguments } from './interfaces/Arguments'
import { Product } from './interfaces/Product'

import { Book } from './models/Book'
import { SerializedBook } from './serializers/Book'

import { Course } from './course/Product'
import { Html } from './html/Product'
import { Pdf } from './pdf/Product'
import { Video } from './video/Product'

import { Log } from './Logging'
import { Tree } from './Tree'
import { Yaml } from './Yaml'

import { NotImplementedError } from './errors/Command'

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
                Log.info("Rendering product", book)
                product.setBook(book)
                product.setLanguage(language)
                product.build()
                product.render(path)
                Log.success('Rendered into', path)
            }

        }
    }
}
