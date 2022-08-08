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

import { Break } from '../features/Break'

import { Text } from '../../models/Text'

export class TitleAdapter implements Adapter {
    apply(section: Section, model: Model): void {
        Log.info("Adapting title to PDF", model)
        const string: string = (model as Text).get(section.getLanguage())
        if (string) {
            new Break().apply(section)
            (section as PdfSection)
                .getDocument()
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
            new Break().apply(section)
        }
    }
}
