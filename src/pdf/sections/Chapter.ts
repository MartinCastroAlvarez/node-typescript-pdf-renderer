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
import { Yaml } from '../../Yaml'

import { TextAdapter } from '../adapters/Text'
import { TitleAdapter } from '../adapters/Title'
import { SubtitleAdapter } from '../adapters/Subtitle'

import { Break } from '../features/Break'
import { Landscape } from '../features/Landscape'

export class ChapterSection extends PdfSection {
    protected chapter: Chapter = new Chapter()

    // Chapter getter and setter.
    getChapter(): Chapter { return this.chapter }
    setChapter(chapter: Chapter) { this.chapter = chapter }

    public getTitle(): string { return this.chapter.title.get(this.getLanguage()) }

    public build(): void {
        super.build()
        Log.info("Building chapter", this.getChapter())

        // Spaces before the Chapter title.
        Array(17).fill(0).forEach(i => new Break().apply(this))

        // Chapter title.
        new TitleAdapter().apply(this, this.getChapter().title)

        // Chapter introduction.
        new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Foreword.yaml'))
        for (let text of this.getChapter().introduction) {
            new TextAdapter().apply(this, text)
        }

        // Chapter stories
        // FIXME

        // Chapter conclusion.
        new SubtitleAdapter().apply(this, Yaml.getString('@i18n/Afterword.yaml'))
        for (let text of this.getChapter().conclusion) {
            new TextAdapter().apply(this, text)
        }

        // Padding with landscapes.
        while (this.getPages() % 4 != 0) {
            this.getDocument().addPage()
            new Landscape().apply(this)
        }

        Log.info("Chapter built successfully", this.getChapter())
    }
}
