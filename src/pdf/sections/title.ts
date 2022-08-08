// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../section'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

import { TitleAdapter } from '../adapters/title'
import { SubtitleAdapter } from '../adapters/subtitle'

export class TitleSection extends PdfSection {
    public getTitle(): string { return 'Title' }

    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())
        new TitleAdapter().adapt(this, this.getBook().title)
        new SubtitleAdapter().adapt(this, this.getBook().subtitle)
        Log.info("Title built successfully", this.getBook())
    }
}
