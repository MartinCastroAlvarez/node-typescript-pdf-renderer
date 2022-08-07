// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Chapter } from '../models/chapter'

import { Yaml } from '../yaml'

import { Section } from './section'

import { Config } from '../config'
import { Log } from '../logging'

export class ChapterSection extends Section {
    protected chapter: Chapter

    constructor() {
        super()
        this.chapter = new Chapter()
    }

    // Book getter and setter.
    getChapter(): Chapter { return this.chapter }
    setChapter(chapter: Chapter) { this.chapter = chapter }

    public build(): void {
        super.build()
        Log.info("Building chapter", this.getChapter())
        this.getDocument().text('Chapter') // FIXME
    }
}
