// ----------------------------------------------------------------
// Purpose:
// This class implements the Cursive adapter.
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

export class CursiveAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Text { return this.model }
    public setModel(model: Text) { this.model = model }

    public apply(): void {
        Log.info("Adapting cursive to PDF", this.getModel(), this.getSection())

        // Checking if text is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Space before the text.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Defining options.
        const options: object = {
            indent: Config.dimensions.getTitle(),
            align: 'justify',
            lineBreak: true,
        }

        // Updating document.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getSecondary())
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getItalic())
            .text(string, options)

        // Space after the text.
        breaks.small()
    }
}
