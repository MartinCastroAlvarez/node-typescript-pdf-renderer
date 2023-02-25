// ----------------------------------------------------------------
// PURPOSE:
// This class implements the BoxAdapter adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { DividableAdapter } from '../../interfaces/Adapter'

import { Log } from '../../utils/Logging'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { HeightException } from '../../errors/Geometry'

import { PdfApi } from '../api/Pdf'

export class BoxAdapter implements DividableAdapter {
    private height: number = 0

    // ----------------------------------------------------------------
    // Content height getters and setters.
    // ----------------------------------------------------------------
    public addHeight(value: number): void {
        Log.info('Increasing box size', value)
        this.setContentHeight(this.getContentHeight() + value)
     }
    private getContentHeight(): number { return this.height }
    private setContentHeight(value: number): void {
        const api: PdfApi = Context.getApi() as PdfApi
        if (value > api.getInnerHeight()) {
            throw new HeightException('Height is larger than the page size!')
        }
        if (value < 0) {
            throw new HeightException('Height can not be negative!')
        }
        this.height = value
        Log.info('New box size', value)
    }

    // ----------------------------------------------------------------
    // Inner height getters & setters.
    // ----------------------------------------------------------------
    private getBoxHeight(): number {
        return this.getContentHeight() + Config.dimensions.getPadding() * 2
    }

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
        Log.info("Adding box rectangle to PDF", Context.getSection())
        if (!this.getContentHeight()) {
            throw new HeightException('Box height is invalid.')
        }
        const api: PdfApi = Context.getApi() as PdfApi
        api.addRectangle({
            x: 0,
            y: api.getCurrentVerticalPosition() - Config.dimensions.getPadding(),
            width: api.getWidth(),
            height: this.getBoxHeight(),
            color1: Config.pallete.getGrey(),
        })
    }

    // ----------------------------------------------------------------
    // Method responsible for wrapping a box around some content.
    // ----------------------------------------------------------------
    public wrap(callback: any): any {
        if (this.isTooLarge()) {
            this.addBreak()
        }
        const api: PdfApi = Context.getApi() as PdfApi
        api.addSpace(Config.dimensions.getPadding())
        api.addSpace(Config.dimensions.getPadding())
        const y: number = api.getCurrentVerticalPosition()
        this.apply()
        callback({
            x: Config.dimensions.getMargin(),
            y: y,
            width: api.getInnerWidth(),
            height: this.getContentHeight(),
        })
        api.addSpace(Config.dimensions.getPadding())
        api.addSpace(Config.dimensions.getPadding())
    }

    // ----------------------------------------------------------------
    // Function responsible for deciding weather the object is too 
    // large to fit or if it requires a page break.
    // ----------------------------------------------------------------
    public getHeight(): number {
        return this.getBoxHeight() + 2 * Config.dimensions.getPadding()
    }
    public isTooLarge(): boolean {
        const api: PdfApi = Context.getApi() as PdfApi
        const estimated: number = api.getCurrentVerticalPosition() + this.getHeight()
        const maximum: number = api.getHeight() - Config.dimensions.getMargin()
        Log.info("Checking if the grey box is outside the page", estimated, maximum)
        return estimated > maximum
    }
    public addBreak() {
        (<PdfApi>Context.getApi()).addPage()
    }
}
