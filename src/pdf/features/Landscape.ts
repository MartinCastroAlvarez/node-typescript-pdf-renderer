// ----------------------------------------------------------------
// Purpose:
// This class implements the Landscape adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Yaml } from '../../Yaml'
import { Tree } from '../../Tree'
import { Log } from '../../Logging'

import { PdfSection } from '../Section'


export class Landscape implements Feature {
    apply(section: Section): void {
        Log.info("Adding landscape to PDF", section)

        // Detecting page size.
        const width: number = (section as PdfSection).getWidth()
        const height: number = (section as PdfSection).getHeight()

        // Extracting PDFKit document.
        const document: any = (section as PdfSection).getDocument()

        // Choosing a random landscape.
        const directory: string = Yaml.dereference('@image/landscapes')
        const landscapes: Array<string> = Tree.list(directory)
        const path: string = landscapes[Math.floor(Math.random() * landscapes.length)]
        const fullPath: string = Tree.join(directory, path)

        // Adding the landscapes.
        document.image(fullPath, 0, 0, {width: width, height: height})
    }
}
