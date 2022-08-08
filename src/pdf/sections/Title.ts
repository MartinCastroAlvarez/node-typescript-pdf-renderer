// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Config } from '../../Config'
import { Log } from '../../Logging'
import { Yaml } from '../../Yaml'

import { TitleAdapter } from '../adapters/Title'
import { SubtitleAdapter } from '../adapters/Subtitle'

export class TitleSection extends PdfSection {
    public getTitle(): string { return 'Title' }

    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())
        for (let author of this.getBook().authors) {
            new SubtitleAdapter().adapt(this, author.name)
        }
        new TitleAdapter().adapt(this, this.getBook().title)
        new SubtitleAdapter().adapt(this, this.getBook().subtitle)
        Log.info("Title built successfully", this.getBook())
    }
}
