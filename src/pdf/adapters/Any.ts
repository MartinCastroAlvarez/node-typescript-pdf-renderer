// ----------------------------------------------------------------
// Purpose:
// This class implements the Any adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'

import { Log } from '../../utils/Logging'

import { Text } from '../../models/Text'
import { Question } from '../../models/Question'

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { PdfSection } from '../Section'

import { TextAdapter } from './Text'
import { HighlightAdapter } from './Highlight'

export class AnyAdapter implements Adapter {
    private model: Model
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Model { return this.model }
    public setModel(model: Model) { this.model = model }

    private getAdapter(): Adapter {
        switch (this.getModel().constructor.name) {
            case Text.name: return new TextAdapter()
            case Question.name: return new HighlightAdapter()
            default: throw new AdapterNotSupportedError("Adapter not supported!")
        }
    }

    public apply(): void {
        Log.info("Adapting any to PDF", this.getModel(), this.getSection())
        const adapter: Adapter = this.getAdapter()
        adapter.setSection(this.getSection())
        adapter.setModel(this.getModel() as Model)
        adapter.apply()
    }
}
