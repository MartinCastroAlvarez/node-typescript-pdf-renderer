// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../utils/Logging'

import { Background } from '../features/Background'

export class BackSection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public getHeader(): string { return '' }
    public getIndex(): string { return '' }

    public build(): void {
        super.build()
        Log.info("Building book back cover", this.getBook())
        const bg: Background = new Background()
        bg.setSection(this)
        bg.apply()
    }
}
