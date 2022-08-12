// ----------------------------------------------------------------
// Purpose:
// This class implements the Break adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'

import { Config } from '../../Config'
import { Log } from '../../Logging'

import { PdfSection } from '../Section'

export class Break implements Feature {
    private section: PdfSection = new PdfSection()
    private amount: number = 1

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    // Amount of breaks to apply.
    getAmount(): number { return this.amount }
    setAmount(amount: number) { this.amount = amount }
    setSmall() { this.amount = 1 }
    setBig() { this.amount = 17 }

    apply(): void {
        Log.info("Adding break to PDF", this.getSection())
        Array(this.getAmount()).fill(0).forEach(i => {
            this.getSection().getDocument()  
                .fontSize(Config.dimensions.getBreak())
                .font(Config.typeface.getNormal())
                .text("\n")
        })
    }
}
