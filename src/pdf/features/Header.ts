// ----------------------------------------------------------------
// Purpose:
// This class implements the Header adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { PdfSection } from '../Section'

export class Header implements Feature {
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public apply(): void {
        Log.info("Adding header to PDF", this.getSection())

        for (let p = 0; p < this.getSection().getPages(); p++) {
            Log.info("Updating section page", p)

            // Jumpting to one page.
            this.getSection().goTo(p)

            // Avoiding pages marked as unnumbered.
            if (this.getSection().getPage().unnumbered === true)
                continue

            // Removing margins for a few seconds.
            let margin: number = this.getSection().getMarginTop()
            this.getSection().setMarginLeft(0)
            this.getSection().setMarginRight(0)
            this.getSection().setMarginTop(0)

            if (!this.getSection().getHeader())
                throw new AdapterNotSupportedError('Section not supported!')

            this.getSection().getDocument()
                .fillColor(Config.pallete.getBlack())
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getItalic())
                .text(
                    this.getSection().getHeader(),
                    0,
                    margin / 2,
                    {
                        align: 'center',
                    }
                )

            // Restoring margins.
            this.getSection().resetMarginTop()
            this.getSection().resetMarginLeft()
            this.getSection().resetMarginRight()
        }
    }
}
