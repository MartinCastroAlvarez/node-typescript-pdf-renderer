// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Chapter } from '../../models/Chapter'

import { PdfSection } from '../Section'

import { Log } from '../../Logging'

import { TitleAdapter } from '../adapters/Title'

export class ChapterSection extends PdfSection {
    protected chapter: Chapter = new Chapter()

    // Chapter getter and setter.
    getChapter(): Chapter { return this.chapter }
    setChapter(chapter: Chapter) { this.chapter = chapter }

    public getTitle(): string { return this.chapter.title.get(this.getLanguage()) }

    public build(): void {
        super.build()
        Log.info("Building chapter", this.getChapter())
        new TitleAdapter().apply(this, this.getChapter().title)
        Log.info("Chapter built successfully", this.getChapter())
    }
}
