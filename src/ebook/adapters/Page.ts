// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Break adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'

import { Log } from '../../utils/Logging'

import { Alignment } from '../../enums/Alignment'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { PdfApi } from '../api/Pdf'

export class PageNumberAdapter implements Adapter {
    private offset: number = 0

    // ----------------------------------------------------------------
    // Page offset getter & setter.
    // ----------------------------------------------------------------
    public getOffset(): number { return this.offset }
    public setOffset(offset: number) { this.offset = offset }

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
    public apply() {
        Log.info("Adding page number to PDF", Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        api.getNumberedPages().forEach(p => {
            Log.info("Updating section page", p)
            api.goTo(p)
            api.setMarginLeft(0)
            api.setMarginRight(0)
            api.setMarginTop(0)
            api.setMarginBottom(0)
            const pageNumber: number = p + this.getOffset() + 1
            api.addText({
                color: Config.pallete.getDarkGrey(),
                size: Config.dimensions.getSmall(),
                font: Config.typeface.getNormal(),
                indent: 0,
                break: false,
                text: pageNumber.toString(),
                align: Alignment.CENTER,
                width: api.getWidth(),
                x: 0,
                y: api.getHeight() - Config.dimensions.getMargin() / 2,
            })
            api.resetMarginTop()
            api.resetMarginLeft()
            api.resetMarginRight()
            api.resetMarginBottom()
        })
    }
}

export class PageHeaderAdapter implements Adapter {

    // Text style getter.
    public getFont(): string { return Config.typeface.getItalic() }
    public getSize(): number { return Config.dimensions.getSmall() }
    public getColor(): string { return Config.pallete.getDarkGrey() }
    public getAlignment(): Alignment { return Alignment.CENTER  } 

    // ----------------------------------------------------------------
    // Main method responsible for adding the text and the padding
    // to the PDF document.
    // ----------------------------------------------------------------
    public apply(): void {
        Log.info("Adding header to PDF", Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        api.getNumberedPages().forEach(p => {
            Log.info("Updating section page", p)
            api.goTo(p)
            api.setMarginLeft(0)
            api.setMarginRight(0)
            api.setMarginTop(0)
            api.addText({
                color: this.getColor(),
                size: this.getSize(),
                font: this.getFont(),
                text: Context.getSection().getHeader().join(' - '),
                align: this.getAlignment(),
                x: 0,
                y: Config.dimensions.getMargin() / 2,
            })
            api.resetMarginTop()
            api.resetMarginLeft()
            api.resetMarginRight()
        })
    }
}
