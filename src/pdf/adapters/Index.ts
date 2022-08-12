// ----------------------------------------------------------------
// Purpose:
// This class implements the Index adapter.
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

export class IndexAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()
    private page: number = 1

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Text { return this.model }
    setModel(model: Text ) { this.model = model }

    getPage(): number { return this.page }
    setPage(page: number) { this.page = page }

    apply(): void {
        Log.info("Adapting index to PDF", this.getModel(), this.getSection())

        // Extracting source title.
        let string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string) return

        // Adding index title.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getSmall())
            .font(Config.typeface.getItalic())
            .text(
                string,
                {
                    align: 'left',
                    continue: true,
                    lineBreak: false,
                }
            )

        // Adding index page.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getSmall())
            .font(Config.typeface.getItalic())
            .text(
                this.getPage().toString(),
                {
                    align: 'right',
                    continue: false,
                    lineBreak: true,
                }
            )

        // Adding a space.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()
    }
}
