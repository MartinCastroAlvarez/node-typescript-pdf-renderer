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
    apply(section: Section, model: Model): void {
        Log.info("Adapting text to PDF", model)

        // Checking if textis empty.
        const string: string = (model as Text).get(section.getLanguage())
        if (!string) return

        // Space before the text.
        new Break().apply(section)

        // Defining options.
        const options: object = {
            indent: Config.dimensions.getTitle(),
            align: 'justify',
            // paragraphGap: Config.dimensions.getNormal(),
            lineBreak: true,
        }

        // Updating document.
        const document: any = (section as PdfSection).getDocument()
        document
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())
            .text(string, options)

        // Space after the text.
        new Break().apply(section)
    }
}
