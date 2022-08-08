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

import { TitleAdapter } from '../adapters/title'
import { SubtitleAdapter } from '../adapters/subtitle'

export class BackSection extends Pdf {
    public build(): void {
        super.build()
        Log.info("Building book back cover", this.getBook())
        new TitleAdapter().adapt(this, this.getBook().title)
        new SubtitleAdapter().adapt(this, this.getBook().subtitle)
    }
}
