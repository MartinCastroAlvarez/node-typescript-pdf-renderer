// ----------------------------------------------------------------
// Purpose:
// This class implements the Link adapter.
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
    private innerPadding: number = 3
    private outerPadding: number = 1

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
            link: string,
            lineBreak: true,
            underline: true,
            width: this.getSection().getInnerWidth() - 2 * Config.dimensions.getBreak(),
        }

        // Extracting current position.
        const width: number = this.getSection().getInnerWidth()
        const left: number = this.getSection().getMarginLeft()
        const top: number = this.getSection()
            .getCurrentVerticalPosition() - Config.dimensions.getBreak() * this.getInnerPadding()

        // Estimating rectanble height.
        const height: number = this.getSection().getDocument()
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())
            .heightOfString(string, options) + 2 * Config.dimensions.getBreak() * this.getInnerPadding()

        // Adding grey background.
        this.getSection().getDocument()
            .rect(left, top, width, height)
            .fill(Config.pallete.getGrey())

        // Adding text.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getPrimary())
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())
            .text(
                string,
                this.getSection().getMarginLeft() + Config.dimensions.getBreak(),
                top + Config.dimensions.getBreak() * this.getInnerPadding(),
                options,
            )

        // Space after the link.
        Array(this.getTotalPadding()).fill(0).forEach(i => breaks.small())
    }
}
