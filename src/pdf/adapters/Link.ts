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

export class LinkAdapter implements Adapter {
    apply(section: Section, model: Model): void {
        Log.info("Adapting link to PDF", model)

        // Checking if link is empty.
        const string: string = (model as Text).get(section.getLanguage())
        if (!string) return

        // Extracting PDFKit document.
        const document: any = (section as PdfSection).getDocument()

        // Space before the link.
        new Break().apply(section)

        // Defining text options.
        const options: object = {
            align: 'center',
            link: string,
            lineBreak: true,
            underline: true,
        }

        // Setting font family and size.
        document
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())

        // Extracting current position.
        const width: number = (section as PdfSection).getInnerWidth()
        const left: number = (section as PdfSection).getMarginLeft()
        const padding: number = Config.dimensions.getBreak()
        const top: number = (section as PdfSection).getCurrentVerticalPosition() - padding
        const height: number = document.heightOfString(string, options) + 2 * padding

        // Adding grey background.
        document
            .rect(left, top, width, height)
            .fill(Config.pallete.getGrey())

        // Updating document.
        document
            .fillColor(Config.pallete.getPrimary())
            .text(string, options)

        // Space after the link.
        new Break().apply(section)

    }
}
