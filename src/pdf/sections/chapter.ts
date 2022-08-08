// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Chapter } from '../../models/chapter'

import { Pdf } from '../product'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

import { TextAdapter } from '../adapters/text'
import { TitleAdapter } from '../adapters/title'

export class ChapterSection extends Pdf {
    protected chapter: Chapter
    protected number: number

    constructor() {
        super()
        this.chapter = new Chapter()
        this.number = 0
    }

    // Chapter getter and setter.
    getChapter(): Chapter { return this.chapter }
    setChapter(chapter: Chapter) { this.chapter = chapter }

    // Number getter and setter.
    getNumber(): number { return this.number }
    setNumber(number: number) { this.number = number }

    public build(): void {
        super.build()
        Log.info("Building chapter", this.getChapter())
        // new TitleAdapter().adapt(this, this.getNumber()) // FIXME
        new TitleAdapter().adapt(this, this.getChapter().title)
    }
}
