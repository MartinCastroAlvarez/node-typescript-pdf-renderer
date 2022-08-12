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
import { Log } from '../../Logging'

import { Text } from '../../models/Text'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class TextAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Text { return this.model }
    setModel(model: Text) { this.model = model }

    apply(): void {
        Log.info("Adapting text to PDF", this.getModel(), this.getSection())

        // Checking if text is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Space before the text.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.apply()

        // Defining options.
        const options: object = {
            indent: Config.dimensions.getTitle(),
            align: 'justify',
            // paragraphGap: Config.dimensions.getNormal(),
            lineBreak: true,
        }

        // Updating document.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())
            .text(string, options)

        // Space after the text.
        breaks.apply()
    }
}
