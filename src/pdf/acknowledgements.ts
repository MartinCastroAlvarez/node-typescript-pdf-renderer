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

export class AcknowledgementsSection extends Section {
    public build(): void {
        super.build()
        Log.info("Building book acknowledgements section", this.getBook())
        this.getDocument().text(
            Yaml.getString('@i18n/Acknowledgements.yaml').get(this.getLanguage()),
            {}
        )
        for (let text of this.getBook().acknowledgements) {
            this.getDocument().text(
                text.get(this.getLanguage()),
                {}
            )
        }
    }
}
