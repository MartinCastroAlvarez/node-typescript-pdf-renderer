// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Section } from '../../interfaces/Section'
import { Model } from '../../interfaces/Model'

import { Config } from '../../Config'
import { Log } from '../../Logging'

import { PdfSection } from '../Section'

import { Text } from '../../models/Text'

export class TextAdapter implements Adapter {
    adapt(section: Section, model: Model): void {
        Log.info("Adapting text to PDF", model)
        const string: string = (model as Text).get(section.getLanguage())
        if (string) {
            (section as PdfSection)
                .getDocument()
                .fontSize(Config.dimensions.getNormal())
                .fillColor(Config.pallete.getBlack())
                .font(Config.typeface.getNormal())
                .text(
                    string,
                    {
                        indent: Config.dimensions.getNormal(),
                        wordSpacing: 4,
                        characterSpacing: 12,
                        align: 'justify',
                        paragraphGap: Config.dimensions.getNormal(),
                        lineBreak: true,
                    }
                )
        }
    }
}
