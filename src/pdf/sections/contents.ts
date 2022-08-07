// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from './section'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

import { TextAdapter } from '../adapters/text'
import { TitleAdapter } from '../adapters/title'

export class TableOfContentsSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book table of contents", this.getBook())
        TitleAdapter.adapt(this.getDocument(), Yaml.getString('@i18n/TableOfContents.yaml').get(this.getLanguage()))
        for (let chapter of this.getBook().chapters) {
            TextAdapter.adapt(this.getDocument(), chapter.title.get(this.getLanguage()))
        }
    }
}
