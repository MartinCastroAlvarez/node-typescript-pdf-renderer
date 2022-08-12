// ----------------------------------------------------------------
// Purpose:
// This class implements the Break adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { PdfSection } from '../Section'

export class Break implements Feature {
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    apply(): void {
        Log.info("Adding break to PDF", this.getSection())
        this.getSection().getDocument()  
            .fontSize(Config.dimensions.getBreak())
            .font(Config.typeface.getNormal())
            .text("\n")
    }

    small(): void {
        Array(1).fill(0).forEach(i => this.apply())
    }

    big(): void {
        Array(17).fill(0).forEach(i => this.apply())
    }
}
