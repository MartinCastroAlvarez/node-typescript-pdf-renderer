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

export class LinkAdapter implements Adapter {
    adapt(section: Section, model: Model): void {
        Log.info("Adapting link to PDF", model)
        const string: string = (model as Text).get(section.getLanguage())
        if (string) {
            const width: number = (section as PdfSection).getInnerWidth()
            const left: number = (section as PdfSection).getMarginLeft()
            const top: number = (section as PdfSection).getCurrentVerticalPosition()
            const height: number = Config.dimensions.getNormal() * 2
            const document: any = (section as PdfSection).getDocument()
            const startingPosition = (section as PdfSection).getCurrentVerticalPosition()
            document
                .fontSize(Config.dimensions.getNormal())
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                    string,
                    {
                        align: 'center',
                        url: string,
                        paragraphGap: Config.dimensions.getNormal(),
                        lineBreak: true,
                    }
                )
            document
                .rect(left, startingPosition, width, height)
                .fill(Config.pallete.getGrey())
        }
    }
}
