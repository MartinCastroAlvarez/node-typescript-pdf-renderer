// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Code adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { ModelAdapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Alignment } from '../../enums/Alignment'

import { Log } from '../../utils/Logging'
import { Yaml } from '../../utils/Yaml'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Code } from '../../models/Code'

import { BoxAdapter } from './Box'

import { PdfApi } from '../api/Pdf'

export class CodeAdapter implements ModelAdapter {
    private model: Code = new Code()
    private box: BoxAdapter = new BoxAdapter()

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Code>model) }

    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Code { return this.model }
    public setModel(model: Code) { this.model = model }

    // ----------------------------------------------------------------
    // Text options.
    // ----------------------------------------------------------------
    private getTextOptions(): object {
        const api: PdfApi = Context.getApi() as PdfApi
        return {
            align: Alignment.LEFT,
            width: api.getInnerWidth() - Config.dimensions.getPadding() * 2,
            text: this.getModel().code.get(Context.getLanguage()),
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getConsole(),
            color: Config.pallete.getDarkGrey(),
            x: Config.dimensions.getMargin() + Config.dimensions.getPadding(),
        }
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
        Log.info("Adapting Code to PDF", this.getModel(), Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        this.box.addHeight(api.sizeOf(this.getTextOptions()))
        this.box.wrap(({x, y}) => {
            api.addText(this.getTextOptions())
        })
    }

    // ----------------------------------------------------------------
    // Function responsible for deciding weather the object is too 
    // large to fit or if it requires a page break.
    // ----------------------------------------------------------------
    public getHeight(): number { return -1 }
    public isTooLarge(): boolean { return false }
    public addBreak() {}
}
