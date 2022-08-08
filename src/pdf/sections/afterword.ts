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

export class AfterwordSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book afterword section", this.getBook())
        TitleAdapter.adapt(this, Yaml.getString('@i18n/Afterword.yaml'), this.getLanguage())
        for (let text of this.getBook().afterword) {
            TextAdapter.adapt(this, text, this.getLanguage())
        }
    }
}
