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

export class ForewordSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book foreword section", this.getBook())
        TitleAdapter.adapt(this.getDocument(), Yaml.getString('@i18n/Foreword.yaml').get(this.getLanguage()))
        for (let text of this.getBook().foreword) {
            TextAdapter.adapt(this.getDocument(), text.get(this.getLanguage()))
        }
    }
}
