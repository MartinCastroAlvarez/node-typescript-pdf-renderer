// ----------------------------------------------------------------
// Purpose:
// This class implements the Subheading adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { Text } from '../../models/Text'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class SubheadingAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Text { return this.model }
    public setModel(model: Text) { this.model = model }

    public apply(): void {
        Log.info("Adapting subheading to PDF", this.getModel(), this.getSection())

        // Checking if title is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Extracting PDFKit document.
        const document: any = this.getSection().getDocument()

        // Space before the title.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Updating document.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getSubtitle())
            .fillColor(Config.pallete.getWhite())
            .font(Config.typeface.getBold())
            .text(
                string,
                {
                    align: 'center',
                    lineBreak: true,
                }
            )

        // Space after the title.
        breaks.small()
    }
}
