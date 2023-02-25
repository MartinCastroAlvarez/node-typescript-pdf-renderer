// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Index adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Section } from '../../interfaces/Section'

import { Alignment } from '../../enums/Alignment'

import { Log } from '../../utils/Logging'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { PdfApi } from '../api/Pdf'

export class IndexAdapter implements Adapter {
    private offset: number = 1
    private section: Section

    public getSection(): Section { return this.section }
    public setSection(section: Section) { this.section = section }

    public getOffset(): number { return this.offset }
    public setOffset(offset: number) { this.offset = offset }
    public getPage(): number { return this.getOffset() + 1}

    public getFont(): string { return Config.typeface.getNormal() }
    public getSize(): number { return Config.dimensions.getNormal() }
    public getAlignment(): Alignment { return Alignment.LEFT } 

    // ----------------------------------------------------------------
    // Main method responsible for updating the current section of the
    // product with the new content.
    //
    // The adapter design pattern allows otherwise incompatible classes
    // to work together by converting the interface of one class into
    // an interface expected by the clients.
    //
    // An adapter can be used when the wrapper must respect a particular
    // interface and must support polymorphic behavior.
    // ----------------------------------------------------------------
    public apply(): void {
        Log.info("Adapting index to PDF", this.getSection(), Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        const y: number = api.getCurrentVerticalPosition()
        const text = this.getSection().getIndex().join(' ')
        const titleOptions: object = {
            color: Config.pallete.getBlack(),
            size: this.getSize(),
            font: this.getFont(),
            text: text,
            align: Alignment.LEFT,
            y: y,
        }
        const dotOptions: object = {
            color: Config.pallete.getDarkGrey(),
            size: this.getSize(),
            font: this.getFont(),
            align: Alignment.LEFT,
            y: y,
        }
        const numberOptions: object = {
            color: Config.pallete.getBlack(),
            size: this.getSize(),
            font: this.getFont(),
            text: this.getPage().toString(),
            align: Alignment.RIGHT,
            y: y,
        }
        const digits = Math.floor(this.getPage() / 10) + 1
        const numberWidth = api.widthOf(numberOptions) + Config.dimensions.getPadding()
        const textWidth = api.widthOf(titleOptions) + Config.dimensions.getPadding()
        const emptyWidth = api.getInnerWidth() - numberWidth - textWidth
        const padding = ' . '
        let paddingSize = 1
        let paddingWidth = 0
        while (paddingWidth < emptyWidth) {
            Log.info('Fitting padding', paddingSize, padding.repeat(paddingSize))
            paddingWidth = api.widthOf({
                ...dotOptions,
                text: padding.repeat(paddingSize),
            })
            paddingSize++
        }
        paddingSize--
        api.addText(titleOptions)
        api.addText({
            ...dotOptions,
            text: padding.repeat(paddingSize),
            x: api.getMarginLeft() + textWidth,
        })
        api.addText(numberOptions)
    }
}
