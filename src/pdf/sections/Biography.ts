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

import { PersonAdapter } from '../adapters/Person'

export class BiographySection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public getHeader(): string { return '' }
    public getIndex(): string { return '' }

    public build(): void {
        super.build()
        Log.info("Building book authors section", this.getBook())
        for (let author of this.getBook().authors) {
            let person: PersonAdapter = new PersonAdapter()
            person.setModel(author)
            person.setSection(this)
            person.apply()
        }
    }
}
