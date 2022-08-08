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

export class TitleAdapter implements Adapter {
    adapt(section: Section, model: Model): void {
        Log.info("Adapting title to PDF", model)
        const string: string = (model as Text).get(section.getLanguage())
        if (string) {
            (section as PdfSection)
                .getDocument()
                .fontSize(Config.dimensions.getTitle())
                .text("\n")
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                    string,
                    {
                        align: 'center',
                        lineBreak: true,
                    }
                )
        }
    }
}
