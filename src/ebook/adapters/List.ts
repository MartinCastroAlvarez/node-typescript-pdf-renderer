// ----------------------------------------------------------------
// PURPOSE:
// This class implements the List adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { ModelAdapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { EmptynessError } from '../../errors/Text'

import { Log } from '../../utils/Logging'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { List } from '../../models/List'

import { PdfApi } from '../api/Pdf'

export class ListAdapter implements ModelAdapter {
    private model: List = new List()

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<List>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): List { return this.model }
    public setModel(model: List) { this.model = model }

    // ----------------------------------------------------------------
    // List string getter.
    // ----------------------------------------------------------------
    private getStrings(): Array<string> {
        if (!this.getModel().items.length) {
            throw new EmptynessError('The list is empty!')
        }
        return this.getModel().items
            .map(text => text.get(Context.getLanguage()))
    }

    // ----------------------------------------------------------------
    // Text styling.
    // ----------------------------------------------------------------
    public getFont(): string { return Config.typeface.getBold() }
    public getSize(): number { return Config.dimensions.getTitle() }
    public getColor(): string { return Config.pallete.getPrimary() }
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }

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
        Log.info("Adapting list to PDF", this.getModel(), Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        api.addSpace(Config.dimensions.getPadding())
        api.addList({
            color: this.getColor(),
            size: this.getSize(),
            font: this.getFont(),
            text: this.getStrings(),
        })
        api.addSpace(Config.dimensions.getPadding())
    }
}
