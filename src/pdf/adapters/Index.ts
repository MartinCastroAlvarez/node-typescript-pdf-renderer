// ----------------------------------------------------------------
// Purpose:
// This class implements the Index adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

import { Chapter } from '../../models/Chapter'

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { AfterwordSection } from '../sections/Afterword'
import { ChapterSection } from '../sections/Chapter'
import { ForewordSection } from '../sections/Foreword'
import { BibliographySection } from '../sections/Bibliography'

export class IndexAdapter implements Adapter {
    private model: Section = new Section()
    private section: PdfSection = new PdfSection()
    private page: number = 1

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Section { return this.model }
    setModel(model: Section ) { this.model = model }

    getPage(): number { return this.page }
    setPage(page: number) { this.page = page }

    apply(): void {
        Log.info("Adapting index to PDF", this.getModel(), this.getSection())

        // Adding index title.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getSmall())
            .font(Config.typeface.getItalic())
            .text(
                this.getString(),
                {
                    align: 'left',
                    continue: true,
                    lineBreak: false,
                }
            )

        // Adding index page.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getSmall())
            .font(Config.typeface.getItalic())
            .text(
                this.getPage().toString(),
                {
                    align: 'right',
                    continue: false,
                    lineBreak: true,
                }
            )

        // Adding a space.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // FIXME: Add page number.
    }

    public isIndexed(): boolean {
        switch(this.getSection().constructor.name) {
            case ForewordSection.name: return true
            case ChapterSection.name: return true
            case AfterwordSection.name: return true
            case BibliographySection.name: return true
            default: return false
        }
    }

    private getString(): string {
        switch(this.getSection().constructor.name) {
            case ForewordSection.name: {
                return Yaml.getString('@i18n/Foreword.yaml')
                    .get(this.getSection().getLanguage())
            }
            case AfterwordSection.name: {
                return Yaml.getString('@i18n/Afterword.yaml')
                    .get(this.getSection().getLanguage())
            }
            case BibliographySection.name: {
                return Yaml.getString('@i18n/Bibliography.yaml')
                    .get(this.getSection().getLanguage())
            }
            case ChapterSection.name: {
                let chapter: Chapter = (this.getModel() as ChapterSection).getChapter()
                return [
                    chapter.getTitle().get(this.getSection().getLanguage()),
                    chapter.getLabel().get(this.getSection().getLanguage()),
                ].join(': ')
            }
            default: {
                throw new AdapterNotSupportedError('Unknown indexed section title')
            }
        }
    }

}
