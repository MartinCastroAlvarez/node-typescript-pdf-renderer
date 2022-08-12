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
import { SourceAdapter } from '../adapters/Source'

import { Landscape } from '../features/Landscape'

export class BibliographySection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())

        // Section title.
        new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Bibliography.yaml'))

        // Bibliography per chapter.
        for (let chapter of this.getBook().chapters) {
            chapter.getSources()?.forEach(source => {
                new SourceAdapter().apply(this, source)
            })
        }

        // Padding with landscapes.
        const landscape = new Landscape()
        landscape.setSection(this)
        landscape.setPadding(2)
        landscape.apply()

        Log.info("Bibliography note built successfully", this.getBook())
    }
}
