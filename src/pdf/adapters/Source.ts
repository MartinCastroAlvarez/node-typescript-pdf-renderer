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
        let string: string = this.getModel().title.get(this.getSection().getLanguage())
        if (!string) return

        // Generating list of authors.
        if (this.getModel().authors.length) {
            const authors = this.getModel().authors.map(author => {
                return author.name.get(this.getSection().getLanguage())
            }).join(", ")
            string = `${string} (${authors})`
        }

        // Updating document.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getSmall())
            .font(Config.typeface.getItalic())
            .text(
                string,
                {
                    align: 'left',
                    // paragraphGap: Config.dimensions.getBreak(),
                    lineBreak: true,
                }
            )

        // Extracting source title.
        if (!this.getModel().link.isEmpty(this.getSection().getLanguage())) {
            let link: string = this.getModel().link.get(this.getSection().getLanguage())
            this.getSection().getDocument()
                .fillColor(Config.pallete.getPrimary())
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getItalic())
                .text(
                    link,
                    {
                        align: 'left',
                        underline: true,
                        link: link,
                        paragraphGap: Config.dimensions.getBreak(),
                        lineBreak: true,
                    }
                )
        }
    }
}
