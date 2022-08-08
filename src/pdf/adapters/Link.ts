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

export class LinkAdapter implements Adapter {
    apply(section: Section, model: Model): void {
        Log.info("Adapting link to PDF", model)

        // Checking if link is empty.
        const string: string = (model as Text).get(section.getLanguage())
        if (!string) return

        const width: number = (section as PdfSection).getInnerWidth()
        const left: number = (section as PdfSection).getMarginLeft()
        const top: number = (section as PdfSection).getCurrentVerticalPosition()
        const height: number = Config.dimensions.getNormal() * 2
        const startingPosition = (section as PdfSection).getCurrentVerticalPosition()

        // Space before the link.
        new Break().apply(section)

        // Updating document.
        const document: any = (section as PdfSection).getDocument()
        document
            .fontSize(Config.dimensions.getNormal())
            .fillColor(Config.pallete.getPrimary())
            .font(Config.typeface.getBold())
            .text("\n")
            .text(
                string,
                {
                    align: 'center',
                    url: string,
                    lineBreak: true,
                }
            )
            .text("\n")

        // Space after the link.
        new Break().apply(section)

        // document
        //     .rect(left, startingPosition, width, height)
        //     .fill(Config.pallete.getGrey())

    }
}
