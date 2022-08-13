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

import { Analogy } from '../../models/Analogy'
import { Definition } from '../../models/Definition'
import { Example } from '../../models/Example'
import { Image } from '../../models/Image'
import { Joke } from '../../models/Joke'
import { List } from '../../models/List'
import { Person } from '../../models/Person'
import { Proverb } from '../../models/Proverb'
import { Question } from '../../models/Question'
import { Quote } from '../../models/Quote'
import { Text } from '../../models/Text'

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { PdfSection } from '../Section'

import { TextAdapter } from './Text'
import { PersonAdapter } from './Person'
import { CursiveAdapter } from './Cursive'
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
            case Person.name: return new PersonAdapter()
            case Example.name: return new CursiveAdapter()
            case Question.name: return new HighlightAdapter()
            case Analogy.name: return new HighlightAdapter()
            case Definition.name: return new HighlightAdapter()
            case Joke.name: return new HighlightAdapter()
            case Proverb.name: return new HighlightAdapter()
            case Question.name: return new HighlightAdapter()
            // case Image: return new HighlightAdapter() // FIXME
            // case List: return new HighlightAdapter() // FIXME
            // case Quote: return new HighlightAdapter() // FIXME
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
