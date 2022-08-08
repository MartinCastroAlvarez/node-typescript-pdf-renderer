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
    protected chapter: Chapter = new Chapter()

    // Chapter getter and setter.
    getChapter(): Chapter { return this.chapter }
    setChapter(chapter: Chapter) { this.chapter = chapter }

    public build(): void {
        super.build()
        Log.info("Building chapter", this.getChapter())
        new TitleAdapter().adapt(this, this.getChapter().title)
    }
}
