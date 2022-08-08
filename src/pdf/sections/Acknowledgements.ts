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

export class AcknowledgementsSection extends PdfSection {
    public getTitle(): string { return 'Ackwnoledgements' }

    public build(): void {
        super.build()
        Log.info("Building book acknowledgements section", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/Acknowledgements.yaml'))
        for (let text of this.getBook().acknowledgements) {
            new TextAdapter().adapt(this, text)
        }
        Log.info("Acknowledgements built successfully", this.getBook())
    }
}
