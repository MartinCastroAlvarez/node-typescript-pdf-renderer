// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Pdf } from '../product'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

import { TextAdapter } from '../adapters/text'
import { TitleAdapter } from '../adapters/title'

export class LegalSection extends Pdf {
    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/Legal.yaml'))
        for (let text of this.getBook().legal) {
            new TextAdapter().adapt(this, text)
        }
    }
}
