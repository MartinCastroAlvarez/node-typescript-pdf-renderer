// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Any adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { ModelAdapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Log } from '../../utils/Logging'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Code } from '../../models/Code'
import { Definition } from '../../models/Definition'
import { Example } from '../../models/Example'
import { Image } from '../../models/Image'
import { Link } from '../../models/Link'
import { List } from '../../models/List'
import { Note } from '../../models/Note'
import { Person } from '../../models/Person'
import { Question } from '../../models/Question'
import { Quote } from '../../models/Quote'
import { Text } from '../../models/Text'
import { Important } from '../../models/Important'

import { AdapterNotSupportedError } from '../../errors/Adapter'

import { CodeAdapter } from './Code'
import { DefinitionAdapter } from './Definition'
import { HighlightAdapter } from './Highlight'
import { ImageAdapter } from './Image'
import { LinkAdapter } from './Link'
import { ListAdapter } from './List'
import { NoteAdapter } from './Note'
import { PersonAdapter } from './Person'
import { QuoteAdapter } from './Quote'
import { ParagraphAdapter, TextAdapter, StrongAdapter, CursiveAdapter } from './Text'

export class AnyAdapter implements ModelAdapter {
    private model: Model

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(model) }

    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Model { return this.model }
    public setModel(model: Model) { this.model = model }

    // ----------------------------------------------------------------
    // Dynamically mapping a Model to an Adapter.
    // ----------------------------------------------------------------
    private getAdapter(): ModelAdapter {
        switch (this.getModel().constructor.name) {

            // Text components.
            case Text.name: return new ParagraphAdapter(this.getModel())

            // Strong components.
            case Important.name: return new StrongAdapter(this.getModel())

            // Cursive components.
            case Example.name: return new CursiveAdapter(this.getModel())

            // Highlighted components.
            case Question.name: return new HighlightAdapter(this.getModel())

            // Custom components.
            case Definition.name: return new DefinitionAdapter(this.getModel())
            case Code.name: return new CodeAdapter(this.getModel())
            case Image.name: return new ImageAdapter(this.getModel())
            case Person.name: return new PersonAdapter(this.getModel())
            case List.name: return new ListAdapter(this.getModel())
            case Link.name: return new LinkAdapter(this.getModel())
            case Quote.name: return new QuoteAdapter(this.getModel())
            case Note.name: return new NoteAdapter(this.getModel())

            // Not supported.
            default: throw new AdapterNotSupportedError("Adapter not supported!")
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
        Log.info("Adapting", Context.getSection().toString(), this.getModel().toString())
        this.getAdapter().apply()
        Log.info("Adapted successfully", Context.getSection().toString(), this.getModel().toString())
    }
}
