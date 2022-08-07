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

import { TextAdapter } from '../adapters/text'
import { TitleAdapter } from '../adapters/title'

export class LegalSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())
        TitleAdapter.adapt(this.getDocument(), Yaml.getString('@i18n/Legal.yaml').get(this.getLanguage()))
        for (let text of this.getBook().legal) {
            TextAdapter.adapt(this.getDocument(), text.get(this.getLanguage()))
        }
    }
}
