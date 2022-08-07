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

export class TableOfContentsSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book table of contents", this.getBook())
        this.getDocument().text(
            Yaml.getString('@i18n/TableOfContents.yaml').get(this.getLanguage()),
            {}
        )
        this.getDocument().text('TableOfContents') // FIXME
    }
}
