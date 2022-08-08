// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Config } from '../../config'
import { Log } from '../../Logging'
import { Yaml } from '../../Yaml'

import { BackgroundAdapter } from '../adapters/Background'
import { TitleAdapter } from '../adapters/Title'
import { SubtitleAdapter } from '../adapters/Subtitle'

export class CoverSection extends PdfSection {
    public getTitle(): string { return 'Cover' }

    public build(): void {
        super.build()
        Log.info("Building book cover", this.getBook())
        new BackgroundAdapter().adapt(this, this.getBook())
        new TitleAdapter().adapt(this, this.getBook().title)
        new SubtitleAdapter().adapt(this, this.getBook().subtitle)
        Log.info("Cover built successfully", this.getBook())
    }
}
