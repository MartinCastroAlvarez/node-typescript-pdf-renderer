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

import { AcknowledgementsSection } from './Acknowledgements'
import { AfterwordSection } from './Afterword'
import { BiographySection } from './Biography'
import { BackSection } from './Back'
import { BibliographySection } from './Bibliography'
import { ChapterSection } from './Chapter'
import { CoverSection } from './Cover'
import { ForewordSection } from './Foreword'
import { LegalSection } from './Legal'
import { TitleSection } from './Title'

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

        // Table of contents.
        let page: number = 1
        for (let section of this.getSections()) {
            switch(section.constructor.name) {
                case ForewordSection.name: {
                    // FIXME: Add page number.
                    let index: IndexAdapter = new IndexAdapter()
                    index.setModel(Yaml.getString('@i18n/Foreword.yaml'))
                    index.setSection(this)
                    index.setPage(page)
                    index.apply()
                    page += section.getPages()
                    continue
                }
                case ChapterSection.name: {
                    // FIXME: Add page number.
                    let index: IndexAdapter = new IndexAdapter()
                    index.setModel((section as ChapterSection).getChapter().title)
                    index.setSection(this)
                    index.setPage(page)
                    index.apply()
                    page += section.getPages()
                    continue
                }
                case AfterwordSection.name: {
                    // FIXME: Add page number.
                    let index: IndexAdapter = new IndexAdapter()
                    index.setModel(Yaml.getString('@i18n/Afterword.yaml'))
                    index.setSection(this)
                    index.setPage(page)
                    index.apply()
                    page += section.getPages()
                    continue
                }
                case BibliographySection.name: {
                    // FIXME: Add page number.
                    let index: IndexAdapter = new IndexAdapter()
                    index.setModel(Yaml.getString('@i18n/Bibliography.yaml'))
                    index.setSection(this)
                    index.setPage(page)
                    index.apply()
                    page += section.getPages()
                    continue
                }
            }
        }
    }

}
