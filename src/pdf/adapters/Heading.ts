// ----------------------------------------------------------------
// Purpose:
// This class implements the heading adapter.
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

export class HeadingAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Text { return this.model }
    setModel(model: Text) { this.model = model }

    apply(): void {
        Log.info("Adapting heading to PDF", this.getModel(), this.getSection())

        // Checking if title is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Space before the title.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.apply()

        // Updating document.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getTitle())
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
        breaks.apply()
    }
}
