// ----------------------------------------------------------------
// Purpose:
// This class implements the Landscape adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'

import { Random } from '../../utils/Random'

import { Config } from '../../Config'
import { Yaml } from '../../utils/Yaml'
import { Tree } from '../../utils/Tree'
import { Log } from '../../utils/Logging'

import { PdfSection } from '../Section'

export class Landscape implements Feature {
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    apply(): void {
        Log.info("Adding landscape to PDF", this.getSection())

        // Detecting page size.
        const width: number = this.getSection().getWidth()
        const height: number = this.getSection().getHeight()

        // Collecting landscapes.
        const directory: string = Yaml.dereference('@image/landscapes')
        const landscapes: Array<string> = Tree.list(directory)

        // Choosing a random landscape.
        const path: string = Random.choice(landscapes)
        const fullPath: string = Tree.join(directory, path)

        // Adding the landscapes.
        this.getSection().getDocument()
            .image(fullPath, 0, 0, {width: width, height: height})
    }

    pad(pages: number = 2) {
        // Padding book with landscapes.
        while (this.getSection().getPages() % pages != 0) {
            this.getSection().getDocument().addPage()
            this.apply()
        }
    }
}
