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

import { AnyAdapter } from '../adapters/Any'
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
        breaks.big()

        // Foreword title.
        let title: TitleAdapter = new TitleAdapter()
        title.setModel(Yaml.getString('@i18n/Foreword.yaml'))
        title.setSection(this)
        title.apply()

        // Foreword text.
        for (let model of this.getBook().foreword) {
            let adapter: AnyAdapter = new AnyAdapter()
            adapter.setModel(model)
            adapter.setSection(this)
            adapter.apply()
        }

        // Padding with landscapes.
        const landscape: Landscape = new Landscape()
        landscape.setSection(this)
        landscape.pad(2)
    }
}
