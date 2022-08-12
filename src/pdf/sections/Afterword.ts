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

export class AfterwordSection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book afterword section", this.getBook())

        // Spaces before the title.
        const breaks: Break = new Break()
        breaks.setSection(this)
        breaks.setBig()
        breaks.apply()

        // Afterword title.
        new TitleAdapter().apply(this, Yaml.getString('@i18n/Afterword.yaml'))

        // Afterword text.
        for (let text of this.getBook().afterword) {
            new TextAdapter().apply(this, text)
        }

        // Padding with landscapes.
        const landscape = new Landscape()
        landscape.setSection(this)
        landscape.setPadding(2)
        landscape.apply()

        Log.info("Afterword built successfully", this.getBook())
    }
}
