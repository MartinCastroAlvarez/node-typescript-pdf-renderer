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

export class ForewordSection extends Pdf {
    public build(): void {
        super.build()
        Log.info("Building book foreword section", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/Foreword.yaml'))
        for (let text of this.getBook().foreword) {
            new TextAdapter().adapt(this, text)
        }
    }
}
