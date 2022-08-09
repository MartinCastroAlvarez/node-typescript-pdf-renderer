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

export class SubtitleAdapter implements Adapter {
    apply(section: Section, model: Model): void {
        Log.info("Adapting subtitle to PDF", model)

        // Checking if subtitle is empty.
        const string: string = (model as Text).get(section.getLanguage())
        if (!string) return

        // Extracting PDFKit document.
        const document: any = (section as PdfSection).getDocument()

        // Space before the subtitle.
        new Break().apply(section)

        // Updating document.
        document
            .fontSize(Config.dimensions.getSubtitle())
            .fillColor(Config.pallete.getSecondary())
            .font(Config.typeface.getBold())
            .text(
                string,
                {
                    align: 'left',
                    lineBreak: true,
                }
            )

        // Space after the subtitle.
        new Break().apply(section)
    }
}
