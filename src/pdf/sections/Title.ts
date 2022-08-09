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

import { Break } from '../features/Break'

export class TitleSection extends PdfSection {
    public getTitle(): string { return 'Title' }

    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())

        // Authors.
        for (let author of this.getBook().authors) {
            new SubtitleAdapter().apply(this, author.name)
        }

        // Space before the title.
        Array(5).fill(0).forEach(i => new Break().apply(this))

        // Book title & subtitle.
        new TitleAdapter().apply(this, this.getBook().title)
        new SubtitleAdapter().apply(this, this.getBook().subtitle)

        Log.info("Title built successfully", this.getBook())
    }
}
