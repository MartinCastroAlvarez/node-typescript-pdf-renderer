// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../Logging'
import { Yaml } from '../../Yaml'

import { TextAdapter } from '../adapters/Text'
import { SubtitleAdapter } from '../adapters/Subtitle'

export class AcknowledgementsSection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book acknowledgements section", this.getBook())

        // Section title.
        new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Acknowledgements.yaml'))

        // Section contents.
        for (let text of this.getBook().acknowledgements) {
            new TextAdapter().apply(this, text)
        }

        Log.info("Acknowledgements built successfully", this.getBook())
    }
}
