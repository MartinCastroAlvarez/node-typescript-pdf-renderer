// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Yaml } from '../yaml'

import { Config } from '../config'
import { Log } from '../logging'

import { Section } from './section'

export class TableOfContentsSection extends Section {
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
