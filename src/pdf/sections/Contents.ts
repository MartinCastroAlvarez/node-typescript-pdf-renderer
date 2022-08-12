// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Section } from '../../interfaces/Section'
import { Model } from '../../interfaces/Model'

import { PdfSection } from '../Section'

import { Log } from '../../utils/Logging'
import { Yaml } from '../../utils/Yaml'

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { TitleAdapter } from '../adapters/Title'

import { PageNumber } from '../features/Page'
import { Index } from '../features/Index'
import { Break } from '../features/Break'

export class TableOfContentsSection extends PdfSection {
    private sections: Array<PdfSection> = new Array<PdfSection>()

    public getSections(): Array<PdfSection> { return this.sections }
    public setSections(sections: Array<PdfSection>) { this.sections = sections }

    public getTitle(): string { return this.constructor.name }

    public getHeader(): string {
        return [
            this.getBook().title.get(this.getLanguage()),
            Yaml.getString('@i18n/TableOfContents.yaml').get(this.getLanguage()),
        ].join(' - ')
    }
    public getIndex(): string { return '' }

    public build(): void {
        super.build()
        Log.info("Building book table of contents", this.getBook())

        // Spaces before the title.
        const breaks: Break = new Break()
        breaks.setSection(this)
        breaks.big()

        // Table of contents title.
        const title: TitleAdapter = new TitleAdapter()
        title.setModel(Yaml.getString('@i18n/TableOfContents.yaml'))
        title.setSection(this)
        title.apply()
    }

    public index(): void {
        Log.info("Indexing table of contents", this.getBook())

        let offset: number = 0
        this.getSections().filter(section => section.getIndex()).forEach(section => {

            // Adding a new line to the Table of Contents.
            const index: Index = new Index()
            index.setTarget(section)
            index.setSection(this)
            index.setOffset(offset)
            index.apply()

            // Iterating over all pages and adding a page number.
            const number: PageNumber = new PageNumber()
            number.setSection(section)
            number.setOffset(offset)
            number.apply()

            // Moving the offset.
            offset += section.getPages()
        })

    }
}
