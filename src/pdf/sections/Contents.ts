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

import { TextAdapter } from '../adapters/Text'
import { TitleAdapter } from '../adapters/Title'

export class TableOfContentsSection extends PdfSection {
    public getTitle(): string { return 'TableOfContents' }

    public build(): void {
        super.build()
        Log.info("Building book table of contents", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/TableOfContents.yaml'))
        for (let chapter of this.getBook().chapters) {
            new TextAdapter().adapt(this, chapter.title)
        }
        Log.info("Table of contents built successfully", this.getBook())
    }
}
