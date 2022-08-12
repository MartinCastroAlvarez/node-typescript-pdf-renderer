// ----------------------------------------------------------------
// Purpose:
// This class implements the Background adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { PdfSection } from '../Section'


export class Background implements Feature {
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    apply(): void {
        Log.info("Adding background to PDF", this.getSection())

        // Detecting page size.
        const width: number = this.getSection().getWidth()
        const height: number = this.getSection().getHeight()

        // Creating a gradient.
        const gradient: any = this.getSection().getDocument().linearGradient(0, 0, width, height)
        gradient.stop(0, Config.pallete.getSecondary())
        gradient.stop(1, Config.pallete.getTertiary())

        // Updating document.
        this.getSection().getDocument()
            .rect(0, 0, width, height)
            .fill(gradient)
    }
}
