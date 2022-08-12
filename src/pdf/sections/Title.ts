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
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book title", this.getBook())

        // Authors.
        for (let author of this.getBook().authors) {
            let name: SubtitleAdapter = new SubtitleAdapter()
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
        let title: TitleAdapter = new TitleAdapter()
        title.setModel(this.getBook().title)
        title.setSection(this)
        title.apply()

        // Book subtitle.
        let subtitle: SubtitleAdapter = new SubtitleAdapter()
        subtitle.setModel(this.getBook().subtitle)
        subtitle.setSection(this)
        subtitle.apply()
    }
}
