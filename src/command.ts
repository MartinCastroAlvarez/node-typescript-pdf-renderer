// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

import { Format } from './enums/format'
import { Language } from './enums/language'

import { Arguments } from './interfaces/arguments'
import { Product } from './interfaces/product'

import { Pdf } from './products/pdf'
import { Course } from './products/course'
import { Html } from './products/html'
import { Video } from './products/video'

class NotImplementedError extends Error {}

export class Command {
    public static run(args: Arguments): void {
        let language: Language = Language[args.language.toUpperCase()]
        let format: Format = Format[args.format.toUpperCase()]
        let product: Product
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
        product.setLanguage(language)
        product.setTitle(args.title)
        product.load()
        let path: string = product.render()
        console.log(`PDF rendered into: ${path}`)
    }
}
