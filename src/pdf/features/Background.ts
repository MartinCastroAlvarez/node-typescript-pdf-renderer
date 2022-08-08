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

import { Text } from '../../models/Text'

export class Background implements Feature {
    add(section: Section): void {
        Log.info("Adding background to PDF", section)
        const document: any = (section as PdfSection).getDocument()
        const width: number = (section as PdfSection).getWidth()
        const height: number = (section as PdfSection).getHeight()
        document
            .rect(0, 0, width, height)
            .fill(Config.pallete.getPrimary())
            .fill(Config.pallete.getSecondary())
    }
}
