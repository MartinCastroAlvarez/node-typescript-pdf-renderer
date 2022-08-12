// ----------------------------------------------------------------
// Purpose:
// This class implements the Chapter adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Yaml } from '../../utils/Yaml'
import { Log } from '../../utils/Logging'

import { Chapter } from '../../models/Chapter'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class ChapterAdapter implements Adapter {
    private model: Chapter = new Chapter()
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Chapter { return this.model }
    setModel(model: Chapter) { this.model = model }

    apply(): void {
        Log.info("Adapting chapter to PDF", this.getModel(), this.getSection())

        // Generating string.
        const string: string = this.getModel().getLabel(this.getSection().getLanguage())

        // Space before the title.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Updating document.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getTitle())
            .fillColor(Config.pallete.getPrimary())
            .font(Config.typeface.getBold())
            .text(
                string,
                {
                    align: 'left',
                    lineBreak: true,
                }
            )

        // Space after the title.
        breaks.small()
    }
}
