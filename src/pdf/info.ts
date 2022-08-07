// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Yaml } from '../yaml'

import { Section } from './section'

import { Config } from '../config'
import { Log } from '../logging'

export class InfoSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())
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
