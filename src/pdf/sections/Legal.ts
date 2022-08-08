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

export class LegalSection extends PdfSection {
    public getTitle(): string { return 'Legal' }

    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())
        new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Legal.yaml'))
        for (let text of this.getBook().legal) {
            new TextAdapter().apply(this, text)
        }
        Log.info("Legal note built successfully", this.getBook())
    }
}
