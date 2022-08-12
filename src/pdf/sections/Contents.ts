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

import { SubtitleAdapter } from '../adapters/Subtitle'
import { IndexAdapter } from '../adapters/Index'

import { PageNumber } from '../features/Page'

import { AfterwordSection } from './Afterword'
import { ChapterSection } from './Chapter'
import { ForewordSection } from './Foreword'
import { BibliographySection } from './Bibliography'

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

        let offset: number = 0

        for (let section of this.getSections()) {
            if (this.isIndexed(section)) { 

                // Adding a new line to the Table of Contents.
                let index: IndexAdapter = new IndexAdapter()
                index.setModel(this.getModel(section))
                index.setSection(this)
                index.setOffset(offset)
                index.apply()

                // Iterating over all pages and adding a page number.
                let number: PageNumber = new PageNumber()
                number.setSection(section)
                number.setOffset(offset)
                number.apply()

                // Moving the offset.
                offset += section.getPages()
            }
        }
    }

    public isIndexed(section: Section): boolean {
        switch(section.constructor.name) {
            case ForewordSection.name: return true
            case ChapterSection.name: return true
            case AfterwordSection.name: return true
            case BibliographySection.name: return true
            default: return false
        }
    }

    private getModel(section: Section): Model {
        switch(section.constructor.name) {
            case ForewordSection.name: return Yaml.getString('@i18n/Foreword.yaml')
            case AfterwordSection.name: return Yaml.getString('@i18n/Afterword.yaml')
            case BibliographySection.name: return Yaml.getString('@i18n/Bibliography.yaml')
            case ChapterSection.name: return (section as ChapterSection).getChapter()
            default: {
                throw new AdapterNotSupportedError('Unknown indexed section title')
            }
        }
    }
}
