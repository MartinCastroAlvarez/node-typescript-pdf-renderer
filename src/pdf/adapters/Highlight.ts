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

import { Box } from '../features/Box'

import { PdfSection } from '../Section'

export class HighlightAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Text { return this.model }
    public setModel(model: Text) { this.model = model }

    public apply(): void {
        Log.info("Adapting link to PDF", this.getModel(), this.getSection())

        // Checking if link is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Creating a rectangle.
        const box: Box = new Box()
        box.setSection(this.getSection())

        // Defining text options.
        const options: object = {
            align: 'center',
            lineBreak: true,
        }

        // Estimating rectanble size.
        box.addHeight(
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getNormal())
                .heightOfString(string, options)
        )

        // Adding text withing the grey box.
        box.wrap(({x, y}) => {
            this.getSection().getDocument()
                .fillColor(Config.pallete.getBlack())
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getItalic())
                .text(
                    string,
                    x,
                    y,
                    options,
                )
        })
    }
}
