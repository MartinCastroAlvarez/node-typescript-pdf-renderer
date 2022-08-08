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

import { Background } from '../features/Background'

export class CoverSection extends PdfSection {
    public getTitle(): string { return 'Cover' }

    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())
        new BackgroundAdapter().apply(this)
        new TitleAdapter().apply(this, this.getBook().title)
        new SubtitleAdapter().adapt(this, this.getBook().subtitle)
        Log.info("Cover built successfully", this.getBook())
    }
}
