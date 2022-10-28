// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Source adapter.
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

import { Source } from '../../models/Source'

import { PdfApi } from '../api/Pdf'

export class SourceAdapter implements ModelAdapter {
    private model: Source = new Source()

    // Text settings.
    public getFont(): string { return Config.typeface.getNormal() }
    public getSize(): number { return Config.dimensions.getSmall() }
    public getColor(): string { return Config.pallete.getBlack() }
    public getAlignment(): Alignment { return Alignment.LEFT }

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Source>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Source { return <Source>this.model }
    public setModel(model: Source) { this.model = <Source>model }

    // ----------------------------------------------------------------
    // Source string getter.
    // ----------------------------------------------------------------
    private getString(): string {
        const s = []
        if (this.getModel().authors.length) {
            s.push(this.getModel().authors.map(author => {
                return author.name.get(Context.getLanguage())
            }).join(", "))
        }
        s.push(`(${this.getModel().getYear()})`)
        s.push(this.getModel().title.get(Context.getLanguage()))
        if (!this.getModel().link.isEmpty(Context.getLanguage())) {
            s.push(this.getModel().link.get(Context.getLanguage()))
        }
        return s.join('. ')
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
        Log.info("Adapting source to PDF", this.getModel(), Context.getSection())
        if (!this.getString()) { return }
        const api: PdfApi = Context.getApi() as PdfApi
        api.addText({
            color: this.getColor(),
            size: this.getSize(),
            font: this.getFont(),
            text: this.getString(),
            align: this.getAlignment(),
        })
    }

}
