// ----------------------------------------------------------------
// Purpose:
// This class implements the Landscape adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'

import { Config } from '../../Config'
import { Yaml } from '../../Yaml'
import { Tree } from '../../Tree'
import { Log } from '../../Logging'

import { PdfSection } from '../Section'

export class Landscape implements Feature {
    private section: PdfSection = new PdfSection()
    private padding: number = 2

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    // Padding getter and setter.
    getPadding(): number { return this.padding }
    setPadding(padding: number) { this.padding = padding }

    apply(): void {
        Log.info("Adding landscape to PDF", this.getSection())

        // Detecting page size.
        const width: number = this.getSection().getWidth()
        const height: number = this.getSection().getHeight()

        // Collecting landscapes.
        const directory: string = Yaml.dereference('@image/landscapes')
        const landscapes: Array<string> = Tree.list(directory)

        // Padding book with landscapes.
        while (this.getSection().getPages() % this.getPadding() != 0) {
            // Adding an empty page.
            this.getSection().getDocument().addPage()

            // Choosing a random landscape.
            const path: string = landscapes[Math.floor(Math.random() * landscapes.length)]
            const fullPath: string = Tree.join(directory, path)

            // Adding the landscapes.
            this.getSection().getDocument().image(fullPath, 0, 0, {width: width, height: height})
        }
    }
}
