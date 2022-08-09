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

export class CoverSection extends PdfSection {
    public getTitle(): string { return 'Cover' }

    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())
        new Background().apply(this)
        new HeadingAdapter().apply(this, this.getBook().title)
        new SubheadingAdapter().apply(this, this.getBook().subtitle)
        Log.info("Cover built successfully", this.getBook())
    }
}
