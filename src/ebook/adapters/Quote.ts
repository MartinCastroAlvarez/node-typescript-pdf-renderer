// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Quote adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { ModelAdapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Alignment } from '../../enums/Alignment'

import { Log } from '../../utils/Logging'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Quote } from '../../models/Quote'

import { BoxAdapter } from './Box'

import { ImageNotFoundError } from '../../errors/Image'

import { PdfApi } from '../api/Pdf'

export class QuoteAdapter implements ModelAdapter {
    private model: Quote = new Quote()
    private box: BoxAdapter = new BoxAdapter()

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Quote>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Quote { return this.model }
    public setModel(model: Quote) { this.model = model }

    // ----------------------------------------------------------------
    // Image options.
    // ----------------------------------------------------------------
    private getImageOptions(x: number = null, y: number = null): object {
        if (!this.getModel().author.avatar.getPath()) {
            throw new ImageNotFoundError('Invalid Person image!')
        }
        return {
            path: this.getModel().author.avatar.getPath(),
            x: x,
            y: y,
            width: Config.dimensions.getAvatar(),
            height: Config.dimensions.getAvatar(),
        }
    }

    // ----------------------------------------------------------------
    // Text options.
    // ----------------------------------------------------------------
    private getTextOptions(y: number = null): object {
        return {
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getItalic(),
            color: Config.pallete.getDarkGrey(),
            align: Alignment.JUSTIFIED,
            x: this.getRightColumnHorziontalPosition(),
            y: y,
            text: [
                '"',
                this.getModel().text.get(Context.getLanguage()),
                '"',
            ].join(" "),
            width: this.getRightColumnWidth(),
        }
    }

    // ----------------------------------------------------------------
    // Title options.
    // ----------------------------------------------------------------
    private getNameOptions(): object {
        return {
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getBold(),
            color: Config.pallete.getDarkGrey(),
            align: Alignment.LEFT,
            text: this.getModel().author.name.get(Context.getLanguage()),
            x: this.getRightColumnHorziontalPosition(),
            width: this.getRightColumnWidth(),
        }
    }

    // ----------------------------------------------------------------
    // Estimating layout dimensions.
    // ----------------------------------------------------------------
    private getRightColumnWidth(): number {
        const api: PdfApi = Context.getApi() as PdfApi
        return [
            api.getInnerWidth(),
            - Config.dimensions.getAvatar(),
            - 3 * Config.dimensions.getPadding(),
        ].reduce((acc, cur) => acc + cur, 0)
    }
    private getRightColumnHorziontalPosition(): number {
        return [
            Config.dimensions.getMargin(),
            Config.dimensions.getAvatar(),
            Config.dimensions.getPadding() * 2,
        ].reduce((acc, cur) => acc + cur, 0)
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
        Log.info("Adapting quote to PDF", this.getModel(), Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        this.box.addHeight(api.sizeOf(this.getTextOptions()))
        this.box.addHeight(api.sizeOf(this.getNameOptions()))
        this.box.wrap(({x, y}) => {
            api.addImage(this.getImageOptions(x, y))
            api.addText(this.getTextOptions(y))
            api.addText(this.getNameOptions())
        })
    }
}
