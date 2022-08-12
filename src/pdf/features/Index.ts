// ----------------------------------------------------------------
// Purpose:
// This class implements the Index feature.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { Break } from '../features/Break'

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { PdfSection } from '../Section'

import { Chapter } from '../../models/Chapter'
import { Text } from '../../models/Text'

export class Index implements Feature {
    private section: PdfSection = new PdfSection()
    private target: PdfSection = new PdfSection()
    private offset: number = 1

    public getTarget(): PdfSection { return this.target }
    public setTarget(section: PdfSection) { this.target = section }

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getOffset(): number { return this.offset }
    public setOffset(offset: number) { this.offset = offset }
    public getPage(): number { return this.getOffset() + 1}

    public apply(): void {
        Log.info("Adapting index to PDF", this.getTarget(), this.getSection())

        if (!this.getTarget().getIndex())
            throw new AdapterNotSupportedError('Section not supported!')

        // Adding index title to the table of contents.
        this.getSection().getDocument()
            .fillColor(Config.pallete.getBlack())
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getItalic())
            .text(
                this.getTarget().getIndex(),
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
}
