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
            let name: SubheadingAdapter = new SubheadingAdapter()
            name.setModel(author.name)
            name.setSection(this)
            name.apply()
        }

        // Space before the title.
        const breaks: Break = new Break()
        breaks.setSection(this)
        breaks.setBig()
        breaks.apply()

        // Book title.
        let title: HeadingAdapter = new HeadingAdapter()
        title.setModel(this.getBook().title)
        title.setSection(this)
        title.apply()

        // Book subtitle.
        let subtitle: SubheadingAdapter = new SubheadingAdapter()
        subtitle.setModel(this.getBook().subtitle)
        subtitle.setSection(this)
        subtitle.apply()
    }
}
