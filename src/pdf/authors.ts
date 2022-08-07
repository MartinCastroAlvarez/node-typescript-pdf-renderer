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

export class AuthorsSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book authors section", this.getBook())
        for (let author of this.getBook().authors) {
            this.getDocument().text(
                author.getName(),
                {}
            )
            if (author.getWebsite())
                this.getDocument().text(
                    author.getWebsite(),
                    {}
                )
            if (author.getEmail())
                this.getDocument().text(
                    author.getEmail(),
                    {}
                )
            // author.logo // FIXME
        }
    }
}
