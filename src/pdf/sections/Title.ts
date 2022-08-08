// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../Logging'

import { SubtitleAdapter } from '../adapters/Subtitle'
import { TitleAdapter } from '../adapters/Title'

export class TitleSection extends PdfSection {
    public getTitle(): string { return 'Title' }

    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())
        for (let author of this.getBook().authors) {
            new SubtitleAdapter().apply(this, author.name)
        }
        new TitleAdapter().apply(this, this.getBook().title)
        new SubtitleAdapter().apply(this, this.getBook().subtitle)
        Log.info("Title built successfully", this.getBook())
    }
}
