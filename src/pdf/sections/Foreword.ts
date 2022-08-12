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
        new TitleAdapter().apply(this, Yaml.getString('@i18n/Foreword.yaml'))

        // Foreword text.
        for (let text of this.getBook().foreword) {
            new TextAdapter().apply(this, text)
        }

        // Padding with landscapes.
        const landscape = new Landscape()
        landscape.setSection(this)
        landscape.setPadding(2)
        landscape.apply()

        Log.info("Foreword built successfully", this.getBook())
    }
}
