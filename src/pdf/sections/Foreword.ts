// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Config } from '../../Config'
import { Log } from '../../Logging'
import { Yaml } from '../../Yaml'

import { TextAdapter } from '../adapters/Text'
import { TitleAdapter } from '../adapters/Title'

export class ForewordSection extends PdfSection {
    public getTitle(): string { return 'Foreword' }

    public build(): void {
        super.build()
        Log.info("Building book foreword section", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/Foreword.yaml'))
        for (let text of this.getBook().foreword) {
            new TextAdapter().adapt(this, text)
        }
        Log.info("Foreword built successfully", this.getBook())
    }
}
