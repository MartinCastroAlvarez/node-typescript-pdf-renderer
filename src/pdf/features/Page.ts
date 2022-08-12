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

export class PageNumber implements Feature {
    private section: PdfSection = new PdfSection()
    private offset: number = 0

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getOffset(): number { return this.offset }
    public setOffset(offset: number) { this.offset = offset }

    public apply(): void {
        Log.info("Adding page number to PDF", this.getSection())

        for (let p = 0; p < this.getSection().getPages(); p++) {
            Log.info("Updating section page", p)

            // Jumpting to one page.
            this.getSection().goTo(p)

            // Avoiding pages marked as unnumbered.
            if (this.getSection().getPage().unnumbered === true)
                continue

            // Removing margins for a few seconds.
            let margin: number = this.getSection().getMarginBottom()
            this.getSection().setMarginBottom(0)
            this.getSection().setMarginLeft(0)
            this.getSection().setMarginRight(0)

            // Calculating the real page number.
            let pageNumber: number = p + this.getOffset() + 1
            Log.info("Updating book page", pageNumber)

            this.getSection().getDocument()
                .fillColor(Config.pallete.getBlack())
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getItalic())
                .text(
                    pageNumber.toString(),
                    0,
                    this.getSection().getHeight() - margin / 2,
                    {
                        align: 'center',
                    }
                )

            // Restoring margins.
            this.getSection().resetMarginBottom()
            this.getSection().resetMarginLeft()
            this.getSection().resetMarginRight()
        }
    }
}

