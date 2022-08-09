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

export class ForewordSection extends PdfSection {
    public getTitle(): string { return 'Foreword' }

    public build(): void {
        super.build()
        Log.info("Building book foreword section", this.getBook())

        // Foreword title.
        new TitleAdapter().apply(this, Yaml.getString('@i18n/Foreword.yaml'))

        // Foreword text.
        for (let text of this.getBook().foreword) {
            new TextAdapter().apply(this, text)
        }

        // Padding with landscapes.
        while (this.getPages() % 2 != 0) {
            this.getDocument().addPage()
            new Landscape().apply(this)
        }

        Log.info("Foreword built successfully", this.getBook())
    }
}
