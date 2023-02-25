// ----------------------------------------------------------------
// PURPOSE:
// The foreword is a short section written by someone other than the person
// that summarizes or sets up the theme of the book. The person who writes
// the foreword is often an eminent colleague or associate, a professional
// who has had personal interaction with the person.
//
// The person explains the purpose behind writing the book, personal experiences
// that are pertinent to the book, and describes the scope of the book. An
// introduction can be deeply personal, seeking to draw the yaml into the
// book on an emotional level, and usually explains why the book was written.
// For scholarly works, the preface or introduction helps erect a framework
// for the content that follows, as well as to explain the person’s point of
// view or thesis.
//
// - The hook — where you grab the reader and give them a reason to keep reading
// - Relatable description of a problem — ideally through a story
// - Believable and inspiring revelation of a solution — also via storytelling
// - Just enough mystery to keep your reader wondering (and reading)
// - Outline of the book — highlighting its main selling points
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Section } from '../../interfaces/Section'

import { FileAlreadyExistsError } from '../../errors/Tree'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Log } from '../../utils/Logging'
import { Tree } from '../../utils/Tree'
import { Yaml } from '../../utils/Yaml'

import { AnyAdapter } from '../adapters/Any'
import { Heading1Adapter, ParagraphAdapter, Heading4Adapter } from '../adapters/Text'
import { LandscapeAdapter } from '../adapters/Background'
import { PageHeaderAdapter, PageNumberAdapter } from '../adapters/Page'

import { PdfApi } from '../api/Pdf'

export class ForewordSection implements Section {
    private api: PdfApi = new PdfApi()

    // Api getter and setter.
    getApi(): PdfApi { return this.api }

    // String serializer.
    public toString(): string { return `${this.constructor.name}` }

    // ----------------------------------------------------------------
    // If these function return an empty list of strings, then this
    // section contains no page header.
    // ----------------------------------------------------------------
    public getHeader(): Array<string> {
        return [
            Context.getBook().title.get(Context.getLanguage()),
            Yaml.getString('@i18n/Foreword.yaml').get(Context.getLanguage()),
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
            Yaml.getString('@i18n/Foreword.yaml').get(Context.getLanguage()),
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
        const finalPath: string = Tree.join(path, `${this.constructor.name}.pdf`)
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

        // Foreword section title.
        new Heading1Adapter(Yaml.getString('@i18n/Foreword.yaml')).apply()

        // Foreword text.
        Context.getBook().foreword.forEach(model => new AnyAdapter(model).apply())

        // Foreword why you should read this book.
        Context.getBook().goal.forEach(model => new ParagraphAdapter(model).apply())

        // Book audience.
        Context.getBook().audience.forEach(model => new ParagraphAdapter(model).apply())

        // Prerequisites.
        Context.getBook().prerequisites.forEach(model => new ParagraphAdapter(model).apply())

        // Foreword chapter structure.
        Context.getBook().chapters.forEach(chapter => {
            let title: Heading4Adapter = new Heading4Adapter(chapter.title)
            title.setPrefix(chapter.number)
            title.apply()
            new ParagraphAdapter(chapter.summary).apply()
        })

        new LandscapeAdapter().pad(2)
    }
}
