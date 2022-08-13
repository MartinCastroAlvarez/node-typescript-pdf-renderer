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

import { Box } from '../features/Box'

import { PdfSection } from '../Section'

export class LinkAdapter implements Adapter {
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
            link: string,
            lineBreak: true,
            underline: true,
        }

        // Estimating rectanble height.
        box.addHeight(
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getNormal())
                .heightOfString(string, options)
        )

        // Adding link withing the grey box.
        box.wrap(({x, y}) => {
            this.getSection().getDocument()
                .fillColor(Config.pallete.getPrimary())
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getNormal())
                .text(
                    string,
                    x,
                    y,
                    options,
                )
        })
    }
}
