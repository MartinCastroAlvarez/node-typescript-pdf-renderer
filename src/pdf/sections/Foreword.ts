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
import { TitleAdapter } from '../adapters/Title'

import { Landscape } from '../features/Landscape'
import { Break } from '../features/Break'

export class ForewordSection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book foreword section", this.getBook())

        // Spaces before the title.
        const breaks: Break = new Break()
        breaks.setSection(this)
        breaks.setBig()
        breaks.apply()

        // Foreword title.
        let title: TitleAdapter = new TitleAdapter()
        title.setModel(Yaml.getString('@i18n/Foreword.yaml'))
        title.setSection(this)
        title.apply()

        // Foreword text.
        for (let text of this.getBook().foreword) {
            let adapter: TextAdapter = new TextAdapter()
            adapter.setModel(text)
            adapter.setSection(this)
            adapter.apply()
        }

        // Padding with landscapes.
        const landscape: Landscape = new Landscape()
        landscape.setSection(this)
        landscape.setPadding(2)
        landscape.apply()
    }
}
