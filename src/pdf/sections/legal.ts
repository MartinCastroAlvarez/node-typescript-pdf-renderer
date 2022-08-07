// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from './section'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

export class LegalSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())
        this.getDocument().text(
            Yaml.getString('@i18n/Legal.yaml').get(this.getLanguage()),
            {}
        )
        for (let text of this.getBook().legal) {
            this.getDocument().text(
                text.get(this.getLanguage()),
                {}
            )
        }
    }
}
