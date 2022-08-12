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
import { SubtitleAdapter } from '../adapters/Subtitle'

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
        new TitleAdapter().apply(this, Yaml.getString('@i18n/TableOfContents.yaml'))

        Log.info("Table of contents built successfully", this.getBook())
    }

    public index(): void {
        Log.info("Indexing table of contents", this.getBook())

        // Table of contents.
        for (let section of this.getSections()) {
            switch(section.constructor.name) {
                case ForewordSection.name: {
                    new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Foreword.yaml'))
                    continue
                }
                case ChapterSection.name: {
                    new SubtitleAdapter().apply(this, (section as ChapterSection).getChapter().title)
                    for (let story of (section as ChapterSection).getChapter().stories) {
                        new TextAdapter().apply(this, story.title)
                    }
                    continue
                }
                case AfterwordSection.name: {
                    new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Afterword.yaml'))
                    continue
                }
                case BibliographySection.name: {
                    new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Bibliography.yaml'))
                    continue
                }
            }
        }

        Log.info("Table of contents indexed successfully", this.getBook())
    }

}
