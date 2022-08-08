// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Config } from '../../Config'
import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'
import { Log } from '../../Logging'
import { Text } from '../../models/Text'
import { Break } from '../features/Break'
import { PdfSection } from '../Section'

export class TitleAdapter implements Adapter {
    apply(section: Section, model: Model): void {
        Log.info("Adapting title to PDF", model)

        // Checking if title is empty.
        const string: string = (model as Text).get(section.getLanguage())
        if (!string) return

        // Space before the title.
        new Break().apply(section)

        // Updating document.
        const document: any = (section as PdfSection).getDocument()
        document
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
        new Break().apply(section)
    }
}
