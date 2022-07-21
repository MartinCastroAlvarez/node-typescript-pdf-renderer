// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
// ----------------------------------------------------------------

import { Language } from './utils/language'
import { Product } from './models/product'

interface Parameters {
    title: string
    language: string
}

export class Command {
    // Method responsible for rendering a PDF.
    renderPdf(params: Parameters): void {
        let product: Product = new Product()
        product.setLanguage(Language[params.language.toUpperCase()])
        product.setTitle(params.title)
        let path: string = product.toPdf()
        console.log(`PDF rendered into: ${path}`)
    }

    // Method responsible for rendering a course.
    renderCourse(params: Parameters): void {
        let product: Product = new Product()
        product.setLanguage(Language[params.language.toUpperCase()])
        product.setTitle(params.title)
        let path: string = product.toCourse()
        console.log(`Course rendered into: ${path}`)
    }

    // Method responsible for rendering a video.
    renderVideo(params: Parameters): void {
        let product: Product = new Product()
        product.setLanguage(Language[params.language.toUpperCase()])
        product.setTitle(params.title)
        let path: string = product.toVideo()
        console.log(`Video rendered into: ${path}`)
    }
}
