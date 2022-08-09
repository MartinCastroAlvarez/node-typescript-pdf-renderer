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

        // Detecting page size.
        const width: number = (section as PdfSection).getWidth()
        const height: number = (section as PdfSection).getHeight()

        // Extracting PDFKit document.
        const document: any = (section as PdfSection).getDocument()

        // Creating a gradient.
        const gradient: any = document.linearGradient(0, 0, width, height)
        gradient.stop(0, Config.pallete.getSecondary())
        gradient.stop(1, Config.pallete.getPrimary())

        // Updating document.
        document
            .rect(0, 0, width, height)
            .fill(gradient)
    }
}
