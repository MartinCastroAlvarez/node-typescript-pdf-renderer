// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

import { Language } from './enums/language'
import { Arguments } from './interfaces/arguments'
import { Product } from './product'

export class Command {
    // Method responsible for rendering a PDF.
    renderPdf(args: Arguments): void {
        let product: Product = new Product()
        product.setLanguage(Language[args.language.toUpperCase()])
        product.setTitle(args.title)
        product.load()
        let path: string = product.toPdf()
        console.log(`PDF rendered into: ${path}`)
    }

    // Method responsible for rendering a course.
    renderCourse(args: Arguments): void {
        let product: Product = new Product()
        product.setLanguage(Language[args.language.toUpperCase()])
        product.setTitle(args.title)
        product.load()
        let path: string = product.toCourse()
        console.log(`Course rendered into: ${path}`)
    }

    // Method responsible for rendering a video.
    renderVideo(args: Arguments): void {
        let product: Product = new Product()
        product.setLanguage(Language[args.language.toUpperCase()])
        product.setTitle(args.title)
        product.load()
        let path: string = product.toVideo()
        console.log(`Video rendered into: ${path}`)
    }

    // Method responsible for rendering a video.
    renderHtml(args: Arguments): void {
        let product: Product = new Product()
        product.setLanguage(Language[args.language.toUpperCase()])
        product.setTitle(args.title)
        product.load()
        let path: string = product.toHtml()
        console.log(`HTML rendered into: ${path}`)
    }
}
