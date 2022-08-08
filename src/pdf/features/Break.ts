// ----------------------------------------------------------------
// Purpose:
// This class implements the Break adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Log } from '../../Logging'

import { PdfSection } from '../Section'

export class Break implements Feature {
    apply(section: Section): void {
        Log.info("Adding break to PDF", section)

        // Updating document.
        const document: any = (section as PdfSection).getDocument()
        document
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())
            .text("\n")
    }
}
