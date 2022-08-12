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

export class SubtitleAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Text { return this.model }
    setModel(model: Text ) { this.model = model }

    apply(): void {
        Log.info("Adapting subtitle to PDF", this.getModel(), this.getSection())

        // Checking if subtitle is empty.
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Space before the subtitle.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Updating document.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getSubtitle())
            .fillColor(Config.pallete.getBlack())
            .font(Config.typeface.getBold())
            .text(
                string,
                {
                    align: 'left',
                    lineBreak: true,
                }
            )

        // Space after the subtitle.
        breaks.small()
    }
}
