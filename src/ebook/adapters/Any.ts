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

import { Analogy } from '../../models/Analogy'
import { Authority } from '../../models/Authority'
import { Benefit } from '../../models/Benefit'
import { Challenge } from '../../models/Challenge'
import { Childhood } from '../../models/Childhood'
import { CliffHanger } from '../../models/CliffHanger'
import { Code } from '../../models/Code'
import { Conspiracy } from '../../models/Conspiracy'
import { Definition } from '../../models/Definition'
import { Erotic } from '../../models/Erotic'
import { Exaggeration } from '../../models/Exaggeration'
import { Example } from '../../models/Example'
import { Experiment } from '../../models/Experiment'
import { Feelings } from '../../models/Feelings'
import { Game } from '../../models/Game'
import { Hero } from '../../models/Hero'
import { HumanScale } from '../../models/HumanScale'
import { Image } from '../../models/Image'
import { Imagine } from '../../models/Imagine'
import { Joke } from '../../models/Joke'
import { Legend } from '../../models/Legend'
import { Link } from '../../models/Link'
import { List } from '../../models/List'
import { Motivation } from '../../models/Motivation'
import { Note } from '../../models/Note'
import { Person } from '../../models/Person'
import { PersonalExperience } from '../../models/PersonalExperience'
import { Prophecy } from '../../models/Prophecy'
import { Proverb } from '../../models/Proverb'
import { Question } from '../../models/Question'
import { Quote } from '../../models/Quote'
import { Research } from '../../models/Research'
import { SocialAcceptance } from '../../models/SocialAcceptance'
import { Statistics } from '../../models/Statistics'
import { Study } from '../../models/Study'
import { Surprise } from '../../models/Surprise'
import { Terror } from '../../models/Terror'
import { Text } from '../../models/Text'
import { TurningPoint } from '../../models/TurningPoint'
import { Urgent } from '../../models/Urgent'
import { Warning } from '../../models/Warning'
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
            case Surprise.name: return new ParagraphAdapter(this.getModel())
            case Research.name: return new ParagraphAdapter(this.getModel())
            case Study.name: return new ParagraphAdapter(this.getModel())
            case Experiment.name: return new ParagraphAdapter(this.getModel())
            case Statistics.name: return new ParagraphAdapter(this.getModel())
            case PersonalExperience.name: return new ParagraphAdapter(this.getModel())
            case Benefit.name: return new ParagraphAdapter(this.getModel())
            case Imagine.name: return new ParagraphAdapter(this.getModel())
            case Feelings.name: return new ParagraphAdapter(this.getModel())
            case SocialAcceptance.name: return new ParagraphAdapter(this.getModel())
            case Authority.name: return new ParagraphAdapter(this.getModel())
            case Challenge.name: return new ParagraphAdapter(this.getModel())
            case Motivation.name: return new ParagraphAdapter(this.getModel())
            case Exaggeration.name: return new ParagraphAdapter(this.getModel())
            case Terror.name: return new ParagraphAdapter(this.getModel())
            case Hero.name: return new ParagraphAdapter(this.getModel())
            case Erotic.name: return new ParagraphAdapter(this.getModel())
            case Joke.name: return new ParagraphAdapter(this.getModel())
            case Game.name: return new ParagraphAdapter(this.getModel())
            case Childhood.name: return new ParagraphAdapter(this.getModel())
            case Legend.name: return new ParagraphAdapter(this.getModel())
            case Conspiracy.name: return new ParagraphAdapter(this.getModel())
            case Prophecy.name: return new ParagraphAdapter(this.getModel())
            case TurningPoint.name: return new ParagraphAdapter(this.getModel())
            case CliffHanger.name: return new ParagraphAdapter(this.getModel())

            // Strong components.
            case Warning.name: return new StrongAdapter(this.getModel())
            case Important.name: return new StrongAdapter(this.getModel())

            // Cursive components.
            case Example.name: return new CursiveAdapter(this.getModel())

            // Highlighted components.
            case HumanScale.name: return new HighlightAdapter(this.getModel())
            case Question.name: return new HighlightAdapter(this.getModel())
            case Analogy.name: return new HighlightAdapter(this.getModel())
            case Definition.name: return new DefinitionAdapter(this.getModel())
            case Proverb.name: return new HighlightAdapter(this.getModel())
            case Question.name: return new HighlightAdapter(this.getModel())
            case Urgent.name: return new HighlightAdapter(this.getModel())

            // Custom components.
            case Code.name: return new CodeAdapter(this.getModel())
            case Image.name: return new ImageAdapter(this.getModel())
            case Person.name: return new PersonAdapter(this.getModel())
            case List.name: return new ListAdapter(this.getModel())
            case Link.name: return new LinkAdapter(this.getModel())
            case Quote.name: return new QuoteAdapter(this.getModel())
            case Note.name: return new NoteAdapter(this.getModel())

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
