// ----------------------------------------------------------------
// PURPOSE:
// With works of fiction, the prologue is written in the voice of a character
// from the story and sets the scene prior to the first chapter. This section
// may describe the setting of the story or the background details and helps
// launch the story.
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
import { Heading1Adapter } from '../adapters/Text'
import { LandscapeAdapter } from '../adapters/Background'
import { PageHeaderAdapter, PageNumberAdapter } from '../adapters/Page'

import { PdfApi } from '../api/Pdf'

export class AfterwordSection implements Section {
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
            Yaml.getString('@i18n/Afterword.yaml').get(Context.getLanguage()),
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
            Yaml.getString('@i18n/Afterword.yaml').get(Context.getLanguage()),
        ]
    }
    public setNumeration(offset: number = 0) {
        Log.info("Setting section enumeration", Context.getProduct().toString(), this.toString())
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
        new Heading1Adapter(Yaml.getString('@i18n/Afterword.yaml')).apply()
        Context.getBook().afterword.forEach(model => new AnyAdapter(model).apply())
        new LandscapeAdapter().pad(2)
    }
}
