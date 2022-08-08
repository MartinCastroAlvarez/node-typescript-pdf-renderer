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

import { BackgroundAdapter } from '../adapters/Background'
import { TitleAdapter } from '../adapters/Title'
import { SubtitleAdapter } from '../adapters/Subtitle'

export class BackSection extends PdfSection {
    public getTitle(): string { return 'Back' }

    public build(): void {
        super.build()
        Log.info("Building book back cover", this.getBook())
        new BackgroundAdapter().adapt(this, this.getBook())
        new TitleAdapter().adapt(this, this.getBook().title)
        new SubtitleAdapter().adapt(this, this.getBook().subtitle)
        Log.info("Back cover built successfully", this.getBook())
    }
}
