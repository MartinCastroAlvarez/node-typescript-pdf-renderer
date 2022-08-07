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

export class TitleSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())
        TitleAdapter.adapt(this.getDocument(), this.getBook().title.get(this.Language()))
        SubtitleAdapter.adapt(this.getDocument(), this.getBook().subtitle.get(this.Language()))
    }
}
