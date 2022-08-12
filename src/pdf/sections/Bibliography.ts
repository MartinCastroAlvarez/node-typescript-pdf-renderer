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
import { TitleAdapter } from '../adapters/Title'
import { SourceAdapter } from '../adapters/Source'

import { Landscape } from '../features/Landscape'
import { Break } from '../features/Break'

export class BibliographySection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public getHeader(): string {
        return [
            this.getBook().title.get(this.getLanguage()),
            Yaml.getString('@i18n/Bibliography.yaml').get(this.getLanguage()),
        ].join(' - ')
    }

    public getIndex(): string { 
        return Yaml.getString('@i18n/Bibliography.yaml').get(this.getLanguage())
    }

    public build(): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())

        // Spaces before the title.
        const breaks: Break = new Break()
        breaks.setSection(this)
        breaks.big()

        // Section title.
        let title: TitleAdapter = new TitleAdapter()
        title.setModel(Yaml.getString('@i18n/Bibliography.yaml'))
        title.setSection(this)
        title.apply()

        // Bibliography per chapter.
        this.getBook().getSources().forEach(source => {
            let adapter: SourceAdapter = new SourceAdapter()
            adapter.setModel(source)
            adapter.setSection(this)
            adapter.apply()
        })

        // Padding with landscapes.
        const landscape: Landscape = new Landscape()
        landscape.setSection(this)
        landscape.pad(2)
    }
}
