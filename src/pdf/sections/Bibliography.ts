// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../utils/Logging'
import { Yaml } from '../../utils/Yaml'

import { TextAdapter } from '../adapters/Text'
import { SubtitleAdapter } from '../adapters/Subtitle'
import { SourceAdapter } from '../adapters/Source'

import { Landscape } from '../features/Landscape'

export class BibliographySection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())

        // Section title.
        let title: SubtitleAdapter = new SubtitleAdapter()
        title.setModel(Yaml.getString('@i18n/Bibliography.yaml'))
        title.setSection(this)
        title.apply()

        // Afterword text.
        for (let text of this.getBook().afterword) {
        }


        // Bibliography per chapter.
        for (let chapter of this.getBook().chapters) {
            chapter.getSources()?.forEach(source => {
                let adapter: SourceAdapter = new SourceAdapter()
                adapter.setModel(source)
                adapter.setSection(this)
                adapter.apply()
            })
        }

        // Padding with landscapes.
        const landscape: Landscape = new Landscape()
        landscape.setSection(this)
        landscape.pad(2)
    }
}
