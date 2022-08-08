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
    adapt(section: Section): void {
        Log.info("Adding break to PDF", section)
        (section as PdfSection)
            .getDocument()
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getNormal())
                .text("\n")
    }
}
