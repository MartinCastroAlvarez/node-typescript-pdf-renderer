// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Note adapter.
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

import { Note } from '../../models/Note'

import { BoxAdapter } from './Box'

import { PdfApi } from '../api/Pdf'

export class NoteAdapter implements ModelAdapter {
    private model: Note = new Note()
    private box: BoxAdapter = new BoxAdapter()

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Note>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Note { return this.model }
    public setModel(model: Note) { this.model = model }

    // ----------------------------------------------------------------
    // Text options.
    // ----------------------------------------------------------------
    private getTextOptions(): object {
        const api: PdfApi = Context.getApi() as PdfApi
        return {
            align: Alignment.LEFT,
            width: api.getInnerWidth() - Config.dimensions.getPadding() * 2,
            text: this.getModel().get(Context.getLanguage()),
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
            text: Yaml.getString('@i18n/Note.yaml').get(Context.getLanguage()),
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
        Log.info("Adapting Note to PDF", this.getModel(), Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        this.box.addHeight(api.sizeOf(this.getTitleOptions()))
        this.box.addHeight(api.sizeOf(this.getTextOptions()))
        this.box.wrap(({x, y}) => {
            api.addText(this.getTitleOptions())
            api.addText(this.getTextOptions())
        })
    }
}
