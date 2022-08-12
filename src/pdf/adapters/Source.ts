// ----------------------------------------------------------------
// Purpose:
// This class implements the Source adapter.
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
import { Source } from '../../models/Source'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class SourceAdapter implements Adapter {
    private model: Source = new Source()
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Source { return this.model }
    public setModel(model: Source) { this.model = model }

    public apply(): void {
        Log.info("Adapting source to PDF", this.getModel(), this.getSection())

        // Extracting source title.
        let title: string = this.getModel().title.get(this.getSection().getLanguage())
        if (!title) return
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getSmall())
            .font(Config.typeface.getBold())
            .text(
                title,
                {
                    align: 'left',
                    lineBreak: true,
                }
            )


        // Generating list of authors.
        if (this.getModel().authors.length) {
            const authors: string = this.getModel().authors.map(author => {
                return author.name.get(this.getSection().getLanguage())
            }).join(", ")
            this.getSection().getDocument()
                .fillColor(Config.pallete.getBlack())
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getItalic())
                .text(
                    authors,
                    {
                        align: 'left',
                        lineBreak: true,
                    }
                )
        }

        // Extracting source title.
        if (!this.getModel().link.isEmpty(this.getSection().getLanguage())) {
            const link: string = this.getModel().link.get(this.getSection().getLanguage())
            this.getSection().getDocument()
                .fillColor(Config.pallete.getPrimary())
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getItalic())
                .text(
                    link,
                    {
                        align: 'left',
                        lineBreak: true,
                        underline: true,
                        link: link,
                    }
                )
        }

        // Adding break after source.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()
        breaks.small()
        breaks.small()
    }
}
