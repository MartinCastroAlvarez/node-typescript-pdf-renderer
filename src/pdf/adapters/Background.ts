// ----------------------------------------------------------------
// Purpose:
// This class implements the background adapter.
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

export class BackgroundAdapter implements Adapter {
    adapt(section: Section, model: Model): void {
        Log.info("Adapting background to PDF", section)
        const document: any = (section as PdfSection).getDocument()
        const width: number = (section as PdfSection).getWidth()
        const height: number = (section as PdfSection).getHeight()
        document
            .rect(0, 0, width, height)
            .fill(Config.pallete.getPrimary())
            .fill(Config.pallete.getSecondary())
    }
}
