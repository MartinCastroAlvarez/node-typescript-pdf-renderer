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

export class SubtitleAdapter implements Adapter {
    adapt(section: Section, model: Model): void {
        Log.info("Adapting subtitle to PDF", model)
        const string: string = (model as Text).get(section.getLanguage())
        if (string) {
            (section as PdfSection)
                .getDocument()
                .text("\n")
                .fontSize(Config.dimensions.getSubtitle())
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
