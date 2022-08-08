// ----------------------------------------------------------------
// Purpose:
// This class implements the Background adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Log } from '../../Logging'

import { PdfSection } from '../Section'


export class Background implements Feature {
    apply(section: Section): void {
        Log.info("Adding background to PDF", section)

        const width: number = (section as PdfSection).getWidth()
        const height: number = (section as PdfSection).getHeight()

        // Updating document.
        const document: any = (section as PdfSection).getDocument()
        document
            .rect(0, 0, width, height)
            .fill(Config.pallete.getPrimary())
            .fill(Config.pallete.getSecondary())
    }
}
