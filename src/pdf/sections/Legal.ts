// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../Logging'
import { Yaml } from '../../Yaml'

import { TextAdapter } from '../adapters/Text'
import { SubtitleAdapter } from '../adapters/Subtitle'

export class LegalSection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())

        // Section title
        const title: SubtitleAdapter = new SubtitleAdapter()
        title.setModel(Yaml.getString('@i18n/Legal.yaml'))
        title.setSection(this)
        title.apply()

        // Section content.
        for (let text of this.getBook().legal) {
            let adapter: TextAdapter = new TextAdapter()
            adapter.setModel(text)
            adapter.setSection(this)
            adapter.apply()
        }
    }
}