// ----------------------------------------------------------------

import { Section } from '../../interfaces/Section'

import { FileAlreadyExistsError } from '../../errors/Tree'

import { Context } from '../../Context'

import { Log } from '../../utils/Logging'
import { Tree } from '../../utils/Tree'

import { AnyAdapter } from '../adapters/Any'
import { Heading1Adapter, Heading2Adapter } from '../adapters/Text'
import { LandscapeAdapter } from '../adapters/Background'
import { PageHeaderAdapter, PageNumberAdapter } from '../adapters/Page'

import { PdfApi } from '../api/Pdf'

import { Chapter } from '../../models/Chapter'

export class ChapterSection implements Section {
    private api: PdfApi = new PdfApi()
    protected chapter: Chapter = new Chapter()

    // Api getter and setter.
    getApi(): PdfApi { return this.api }

    // Chapter getter and setter.
    getChapter(): Chapter { return this.chapter }
    setChapter(chapter: Chapter) { this.chapter = chapter }

    // String serializer.
    public toString(): string { return `${this.constructor.name}` }

    // ----------------------------------------------------------------
    // If these function return an empty list of strings, then this
    // section contains no page header.
    // ----------------------------------------------------------------
    public getHeader(): Array<string> {
        return [
            Context.getBook().title.get(Context.getLanguage()),
            this.getChapter().number.get(Context.getLanguage()),
            this.getChapter().title.get(Context.getLanguage()),
        ]
    }
    public setHeader() {
        Log.info('Setting header:', this)
        Context.setSection(this)
        new PageHeaderAdapter().apply()
    }

    // ----------------------------------------------------------------
    // Section referece in the table of contents.
    //
    // If this function returns an empty list of strings, then this
    // section is not indexed in the table of contents.
    // ----------------------------------------------------------------
    public getIndex(): Array<string> {
        return [
            this.getChapter().number.get(Context.getLanguage()),
            this.getChapter().title.get(Context.getLanguage()),
        ]
    }
    public setNumeration(offset: number = 0) {
        Context.setSection(this)
        const page: PageNumberAdapter = new PageNumberAdapter()
        page.setOffset(offset)
        page.apply()
    }

    // ----------------------------------------------------------------
    // Method responsible for rendering the PDF section.
    // The section must be merged by the Product in which this
    // Section was created.
    // ----------------------------------------------------------------
    public async render(path: string): Promise<string> {
        Log.info("Rendering section", this, path)
        const finalPath: string = Tree.join(
            path,
            `${this.getChapter().getNumber()}-${this.getChapter().title.get()}.pdf`,
        )
        if (Tree.exists(finalPath)) {
            throw new FileAlreadyExistsError(`File already exists: ${finalPath}`)
        }
        await this.getApi().flush(Tree.stream(finalPath))
        Log.info("Rendered section", this, path)
        return finalPath
    }

    // ----------------------------------------------------------------
    // Method responsible for building the section before it can
    // be rendered into a file.
    // ----------------------------------------------------------------
    public async build() {
        Context.setSection(this)

        // Chapter title.
        const c: Heading1Adapter = new Heading1Adapter(this.getChapter().title)
        c.setPrefix(this.getChapter().number)
        c.apply()

        // Chapter stories
        this.getChapter().stories.forEach(story => {

            // Setting story title.
            const title: Heading2Adapter = new Heading2Adapter(story.title)
            title.setPrefix(story.number)
            title.apply()

            // Story body.
            story.items.forEach(item => new AnyAdapter(item).apply())
        })

        // Pad chapter.
        new LandscapeAdapter().pad(2)
    }
}
