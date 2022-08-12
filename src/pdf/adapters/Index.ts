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

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { PdfSection } from '../Section'

import { Chapter } from '../../models/Chapter'
import { Text } from '../../models/Text'

export class IndexAdapter implements Adapter {
    private model: Model
    private section: PdfSection = new PdfSection()
    private offset: number = 1

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Model { return this.model }
    public setModel(model: Model ) { this.model = model }

    public getOffset(): number { return this.offset }
    public getPage(): number { return this.getOffset() + 1}
    public setOffset(offset: number) { this.offset = offset }

    public apply(): void {
        Log.info("Adapting index to PDF", this.getModel(), this.getSection())

        // Adding index title.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getItalic())
            .text(
                this.getString(),
                {
                    align: 'left',
                    lineBreak: true,
                }
            )

        // Adding the page number.
        this.getSection().getDocument().moveUp()
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getItalic())
            .text(
                this.getPage().toString(),
                {
                    align: 'right',
                    lineBreak: true,
                }
            )


        // Adding a space.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()
    }

    private getString(): string {
        switch(this.getModel().constructor.name) {
            case Text.name: {
                let text: Text = (this.getModel() as Text)
                return text.get(this.getSection().getLanguage())
            }
            case Chapter.name: {
                let chapter: Chapter = (this.getModel() as Chapter)
                return [
                    chapter.getLabel(this.getSection().getLanguage()),
                    chapter.title.get(this.getSection().getLanguage()),
                ].join(': ')
            }
            default: {
                throw new AdapterNotSupportedError('Unknown indexed section title')
            }
        }
    }
}
