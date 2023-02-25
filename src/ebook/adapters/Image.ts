// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Image adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { ModelAdapter, DividableAdapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Alignment } from '../../enums/Alignment'

import { Log } from '../../utils/Logging'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Image } from '../../models/Image'

import { ImageOrientationError } from '../../errors/Image'

import { PdfApi } from '../api/Pdf'

export class ImageAdapter implements ModelAdapter, DividableAdapter {
    private model: Image = new Image()

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Image>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Image { return this.model }
    public setModel(model: Image) { this.model = model }

    // ----------------------------------------------------------------
    // Image dimensions.
    // ----------------------------------------------------------------
    private getImageWidth(): number {
        const api: PdfApi = Context.getApi() as PdfApi
        if (this.getModel().isLandscape()) {
            return api.getInnerWidth()
        }
        if (this.getModel().isSquare()) {
            return api.getInnerWidth() * 0.5
        }
        if (this.getModel().isPortrait()) {
            return this.getImageHeight() * this.getModel().getRatio()
        }
        throw new ImageOrientationError('Image orientation not supported!') 
    }
    private getImageHeight(): number {
        const api: PdfApi = Context.getApi() as PdfApi
        if (this.getModel().isPortrait()) {
            return api.getInnerWidth() * 0.75
        }
        if (this.getModel().isSquare()) {
            return this.getImageWidth() * this.getModel().getRatio()
        }
        if (this.getModel().isLandscape()) {
            return this.getImageWidth() * this.getModel().getRatio()
        }
        throw new ImageOrientationError('Image orientation not supported!') 
    }

    // ----------------------------------------------------------------
    // Image options.
    // ----------------------------------------------------------------
    public getImageOptions(): object {
        const api: PdfApi = Context.getApi() as PdfApi
        return {
            width: this.getImageWidth(),
            height: this.getImageHeight(),
            x: api.getWidth() / 2 - this.getImageWidth() / 2,
            path: this.getModel().getPath(),
        }
    }

    // ----------------------------------------------------------------
    // Text options.
    // ----------------------------------------------------------------
    public getTextOptions(): object {
        return {
            size: Config.dimensions.getSmall(),
            font: Config.typeface.getItalic(),
            color: Config.pallete.getDarkGrey(),
            text: this.getModel().legend.get(Context.getLanguage()),
            align: Alignment.CENTER,
        }
    }

    // ----------------------------------------------------------------
    // Function responsible for deciding weather the object is too 
    // large to fit or if it requires a page break.
    // ----------------------------------------------------------------
    public getHeight(): number {
        const api: PdfApi = Context.getApi() as PdfApi
        return [
            this.getModel().getHeight(),
            this.getModel().legend.get(Context.getLanguage()) ? api.sizeOf(this.getTextOptions()) : 0,
            2 * Config.dimensions.getPadding(),
        ].reduce((acc, cur) => acc + cur, 0)
    }
    public isTooLarge(): boolean {
        const api: PdfApi = Context.getApi() as PdfApi
        const estimated: number = api.getCurrentVerticalPosition() + this.getHeight()
        const maximum: number = api.getHeight() * 0.9 - Config.dimensions.getMargin()
        Log.info("Checking if the title is very low in the current page", estimated, maximum)
        return estimated > maximum
    }
    public addBreak() {
        (<PdfApi>Context.getApi()).addPage()
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
        Log.info("Adapting image to PDF", this.getModel(), Context.getSection())
        if (this.isTooLarge()) {
            this.addBreak()
        }
        const api: PdfApi = Context.getApi() as PdfApi
        api.addSpace(Config.dimensions.getPadding())
        api.addImage(this.getImageOptions())
        api.addSpace(Config.dimensions.getPadding())
        if (this.getModel().legend.get(Context.getLanguage())) {
            api.addText(this.getTextOptions())
        }
        api.addSpace(Config.dimensions.getPadding())
    }
}
