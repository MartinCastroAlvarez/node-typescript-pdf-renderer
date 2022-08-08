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

import { Background } from '../features/Background'

export class CoverSection extends PdfSection {
    public getTitle(): string { return 'Cover' }

    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())
        new Background().apply(this)
        new TitleAdapter().apply(this, this.getBook().title)
        new SubtitleAdapter().apply(this, this.getBook().subtitle)
        Log.info("Cover built successfully", this.getBook())
    }
}
