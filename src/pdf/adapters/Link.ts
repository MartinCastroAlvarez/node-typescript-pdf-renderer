// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
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

export class LinkAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Text { return this.model }
    setModel(model: Text) { this.model = model }

    apply(): void {
        Log.info("Adapting link to PDF", this.getModel(), this.getSection())

        // Checking if link is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Extracting PDFKit document.
        const document: any = this.getSection().getDocument()

        // Space before the link.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Defining text options.
        const options: object = {
            align: 'center',
            link: string,
            lineBreak: true,
            underline: true,
        }

        // Setting font family and size.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())

        // Extracting current position.
        const width: number = this.getSection().getInnerWidth()
        const left: number = this.getSection().getMarginLeft()
        const padding: number = Config.dimensions.getBreak()
        const top: number = this.getSection().getCurrentVerticalPosition() - padding
        const height: number = this.getSection().getDocument()
            .heightOfString(string, options) + 2 * padding

        // Adding grey background.
        this.getSection().getDocument()
            .rect(left, top, width, height)
            .fill(Config.pallete.getGrey())

        // Updating document.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getPrimary())
            .text(string, options)

        // Space after the link.
        breaks.small()
    }
}
