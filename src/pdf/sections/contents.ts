// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Pdf } from '../product'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

import { TextAdapter } from '../adapters/text'
import { TitleAdapter } from '../adapters/title'

export class TableOfContentsSection extends Pdf {
    public build(): void {
        super.build()
        Log.info("Building book table of contents", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/TableOfContents.yaml'))
        for (let chapter of this.getBook().chapters) {
            new TextAdapter().adapt(this, chapter.title)
        }
    }
}
