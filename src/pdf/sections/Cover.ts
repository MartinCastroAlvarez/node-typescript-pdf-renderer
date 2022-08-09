// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../Logging'

import { HeadingAdapter } from '../adapters/Heading'
import { SubheadingAdapter } from '../adapters/Subheading'

import { Background } from '../features/Background'
import { Break } from '../features/Break'

export class CoverSection extends PdfSection {
    public getTitle(): string { return 'Cover' }

    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())

        // Cover background.
        new Background().apply(this)

        // Authors.
        for (let author of this.getBook().authors) {
            new SubheadingAdapter().apply(this, author.name)
        }

        // Space before the title.
        Array(10).fill(0).forEach(i => new Break().apply(this))

        // Book title & subtitle.
        new HeadingAdapter().apply(this, this.getBook().title)
        new SubheadingAdapter().apply(this, this.getBook().subtitle)

        Log.info("Cover built successfully", this.getBook())
    }
}
