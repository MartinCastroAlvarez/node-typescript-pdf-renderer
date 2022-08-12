// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Chapter } from '../../models/Chapter'

import { PdfSection } from '../Section'

import { Log } from '../../utils/Logging'
import { Yaml } from '../../Yaml'

import { TextAdapter } from '../adapters/Text'
import { TitleAdapter } from '../adapters/Title'
import { SubtitleAdapter } from '../adapters/Subtitle'
import { StoryAdapter } from '../adapters/Story'

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
        const breaks: Break = new Break()
        breaks.setSection(this)
        breaks.big()

        // Chapter title.
        let title: TitleAdapter = new TitleAdapter()
        title.setModel(this.getChapter().title)
        title.setSection(this)
        title.apply()

        // Chapter introduction.
        let foreword: SubtitleAdapter = new SubtitleAdapter()
        foreword.setModel(Yaml.getString('@i18n/Foreword.yaml'))
        foreword.setSection(this)
        foreword.apply()
        for (let text of this.getChapter().introduction) {
            let adapter: TextAdapter = new TextAdapter()
            adapter.setModel(text)
            adapter.setSection(this)
            adapter.apply()
        }

        // Chapter stories
        for (let story of this.getChapter().stories) {
            let adapter: StoryAdapter = new StoryAdapter()
            adapter.setModel(story)
            adapter.setSection(this)
            adapter.apply()
        }

        // Chapter conclusion.
        let afterword: SubtitleAdapter = new SubtitleAdapter()
        afterword.setModel(Yaml.getString('@i18n/Afterword.yaml'))
        afterword.setSection(this)
        afterword.apply()
        for (let text of this.getChapter().conclusion) {
            let adapter: TextAdapter = new TextAdapter()
            adapter.setModel(text)
            adapter.setSection(this)
            adapter.apply()
        }

        // Padding with landscapes.
        const landscape: Landscape = new Landscape()
        landscape.setSection(this)
        landscape.pad(2)
    }
}
