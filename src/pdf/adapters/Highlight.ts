// ----------------------------------------------------------------
// Purpose:
// This class implements the Highlight adapter.
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

export class HighlightAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()
    private innerPadding: number = 5
    private outerPadding: number = 3

    private getInnerPadding(): number { return this.innerPadding }
    private getOuterPadding(): number { return this.outerPadding }
    private getTotalPadding(): number { return this.getInnerPadding() + this.getOuterPadding() }

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Text { return this.model }
    public setModel(model: Text) { this.model = model }

    public apply(): void {
        Log.info("Adapting link to PDF", this.getModel(), this.getSection())

        // Checking if link is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Space before the link.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        Array(this.getTotalPadding()).fill(0).forEach(i => breaks.small())

        // Defining text options.
        const options: object = {
            align: 'center',
            lineBreak: true,
        }

        // Setting font family and size.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())

        // Extracting current position.
        const width: number = this.getSection().getInnerWidth()
        const left: number = this.getSection().getMarginLeft()
        const padding: number = Config.dimensions.getBreak()
        const top: number = this.getSection()
            .getCurrentVerticalPosition() - padding * this.getInnerPadding()
        const height: number = this.getSection().getDocument()
            .heightOfString(string, options) + 2 * padding * this.getInnerPadding()

        // Adding grey background.
        this.getSection().getDocument()
            .rect(left, top, width, height)
            .fill(Config.pallete.getGrey())

        // Adding text.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .text(string, options)

        // Space after the link.
        Array(this.getTotalPadding()).fill(0).forEach(i => breaks.small())
    }
}
