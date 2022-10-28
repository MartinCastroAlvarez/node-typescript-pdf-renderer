// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Definition adapter.
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

import { Definition } from '../../models/Definition'

import { BoxAdapter } from './Box'

import { PdfApi } from '../api/Pdf'

export class DefinitionAdapter implements ModelAdapter {
    private model: Definition = new Definition()
    private box: BoxAdapter = new BoxAdapter()

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Definition>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Definition { return this.model }
    public setModel(model: Definition) { this.model = model }

    // ----------------------------------------------------------------
    // Text options.
    // ----------------------------------------------------------------
    private getTextOptions(): object {
        const api: PdfApi = Context.getApi() as PdfApi
        return {
            align: Alignment.LEFT,
            width: api.getInnerWidth() - Config.dimensions.getPadding() * 2,
            text: this.getModel().description.get(Context.getLanguage()),
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getNormal(),
            color: Config.pallete.getBlack(),
            x: Config.dimensions.getMargin() + Config.dimensions.getPadding(),
        }
    }

    // ----------------------------------------------------------------
    // Title options.
    // ----------------------------------------------------------------
    private getTitleOptions(): object {
        const api: PdfApi = Context.getApi() as PdfApi
        return {
            align: Alignment.LEFT,
            width: api.getInnerWidth() - Config.dimensions.getPadding() * 2,
            text: this.getModel().title.get(Context.getLanguage()),
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getBold(),
            color: Config.pallete.getPrimary(),
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
        Log.info("Adapting Definition to PDF", this.getModel(), Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        this.box.addHeight(api.sizeOf(this.getTitleOptions()))
        this.box.addHeight(api.sizeOf(this.getTextOptions()))
        this.box.wrap(({x, y}) => {
            api.addText(this.getTitleOptions())
            api.addText(this.getTextOptions())
        })
    }
}
