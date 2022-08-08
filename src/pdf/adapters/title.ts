// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/adapter'
import { Section } from '../../interfaces/section'
import { Model } from '../../interfaces/model'

import { Config } from '../../config'
import { Log } from '../../logging'

import { PdfSection } from '../section'

import { Text } from '../../models/text'

export class TitleAdapter implements Adapter {
    adapt(section: Section, model: Model): void {
        Log.info("Adapting title to PDF", model)
        const string: string = (model as Text).get(section.getLanguage())
        if (string) {
            (section as PdfSection)
                .getDocument()
                .fontSize(Config.dimensions.getTitle())
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                    string,
                    {
                        align: 'center',
                        paragraphGap: Config.dimensions.getTitle(),
                        lineBreak: true,
                    }
                )
        }
    }
}
