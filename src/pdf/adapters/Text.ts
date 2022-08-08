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

import { PdfSection } from '../Section'

import { Text } from '../../models/Text'

export class TextAdapter implements Adapter {
    apply(section: Section, model: Model): void {
        Log.info("Adapting text to PDF", model)
        const string: string = (model as Text).get(section.getLanguage())
        if (string) {
            (section as PdfSection)
                .getDocument()
                .fillColor(Config.pallete.getBlack())
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getNormal())
                .text(
                    string,
                    {
                        indent: Config.dimensions.getNormal(),
                        wordSpacing: 1,
                        lineSpacing: 10,
                        characterSpacing: 1,
                        align: 'justify',
                        // paragraphGap: Config.dimensions.getNormal(),
                        lineBreak: true,
                    }
                )
        }
    }
}
