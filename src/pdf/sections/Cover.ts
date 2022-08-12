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
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())

        // Cover background.
        const bg: Background = new Background()
        bg.setSection(this)
        bg.apply()

        // Authors.
        for (let author of this.getBook().authors) {
            new SubheadingAdapter().apply(this, author.name)
        }

        // Space before the title.
        const breaks: Break = new Break()
        breaks.setSection(this)
        breaks.setBig()
        breaks.apply()

        // Book title & subtitle.
        new HeadingAdapter().apply(this, this.getBook().title)
        new SubheadingAdapter().apply(this, this.getBook().subtitle)

        Log.info("Cover built successfully", this.getBook())
    }
}
