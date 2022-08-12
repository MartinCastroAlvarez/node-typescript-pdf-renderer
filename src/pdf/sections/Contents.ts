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

import { SubtitleAdapter } from '../adapters/Subtitle'
import { IndexAdapter } from '../adapters/Index'

export class TableOfContentsSection extends PdfSection {
    private sections: Array<PdfSection> = new Array<PdfSection>()

    public getSections(): Array<PdfSection> { return this.sections }
    public setSections(sections: Array<PdfSection>) { this.sections = sections }

    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book table of contents", this.getBook())

        // Table of contents title.
        const title: SubtitleAdapter = new SubtitleAdapter()
        title.setModel(Yaml.getString('@i18n/TableOfContents.yaml'))
        title.setSection(this)
        title.apply()
    }

    public index(): void {
        Log.info("Indexing table of contents", this.getBook())
        let page: number = 1
        for (let section of this.getSections()) {
            let index: IndexAdapter = new IndexAdapter()
            index.setModel(section)
            index.setSection(this)
            index.setPage(page)
            if (index.isIndexed()) {
                index.apply()
                page += section.getPages()
            }
        }
    }

}
