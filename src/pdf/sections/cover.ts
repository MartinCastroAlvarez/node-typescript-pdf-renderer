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

export class CoverSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())
        this.getDocument().text(
            this.getBook().title.get(this.getLanguage()),
            {}
        )
        this.getDocument().text(
            this.getBook().subtitle.get(this.getLanguage()),
            {}
        )
    }
}
