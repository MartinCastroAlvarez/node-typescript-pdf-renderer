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

export class AfterwordSection extends PdfSection {
    public getTitle(): string { return 'Afterword' }

    public build(): void {
        super.build()
        Log.info("Building book afterword section", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/Afterword.yaml'))
        for (let text of this.getBook().afterword) {
            new TextAdapter().adapt(this, text)
        }
        Log.info("Afterword built successfully", this.getBook())
    }
}
