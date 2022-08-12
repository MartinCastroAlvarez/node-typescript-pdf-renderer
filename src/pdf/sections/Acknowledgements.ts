// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../utils/Logging'
import { Yaml } from '../../Yaml'

import { TextAdapter } from '../adapters/Text'
import { SubtitleAdapter } from '../adapters/Subtitle'

export class AcknowledgementsSection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book acknowledgements section", this.getBook())

        // Section title.
        let title: SubtitleAdapter = new SubtitleAdapter()
        title.setModel(Yaml.getString('@i18n/Acknowledgements.yaml'))
        title.setSection(this)
        title.apply()

        // Acknowledgements text.
        for (let text of this.getBook().acknowledgements) {
            let adapter: TextAdapter = new TextAdapter()
            adapter.setModel(text)
            adapter.setSection(this)
            adapter.apply()
        }
    }
}
