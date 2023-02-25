// ----------------------------------------------------------------

import { Section } from '../../interfaces/Section'

import { FileAlreadyExistsError } from '../../errors/Tree'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Log } from '../../utils/Logging'
import { Tree } from '../../utils/Tree'
import { Yaml } from '../../utils/Yaml'

import { SourceAdapter } from '../adapters/Source'
import { Heading1Adapter, Heading2Adapter } from '../adapters/Text'
import { LandscapeAdapter } from '../adapters/Background'
import { PageHeaderAdapter, PageNumberAdapter } from '../adapters/Page'

import { PdfApi } from '../api/Pdf'

export class BibliographySection implements Section {
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
            Yaml.getString('@i18n/Bibliography.yaml').get(Context.getLanguage())
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
    public getIndex(): Array<string> { return [] }
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
        new Heading1Adapter(Yaml.getString('@i18n/Bibliography.yaml')).apply()
        Context.getBook().chapters.forEach(chapter => {
            new Heading2Adapter(chapter.title).apply()
            chapter.getSources().forEach(source => new SourceAdapter(source).apply())
        })
        new LandscapeAdapter().pad(2)
    }
}
