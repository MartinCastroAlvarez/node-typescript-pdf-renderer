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

import { TitleAdapter } from '../adapters/title'
import { SubtitleAdapter } from '../adapters/subtitle'

export class BackSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book back cover", this.getBook())
        TitleAdapter.adapt(this, this.getBook().title, this.getLanguage())
        SubtitleAdapter.adapt(this, this.getBook().subtitle, this.getLanguage())
    }
}
