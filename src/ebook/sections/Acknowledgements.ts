// ----------------------------------------------------------------
// PURPOSE:
// The dedication page allows the person to honor an individual or individuals.
// The dedication is usually a short sentence or two.
// // This page allows the person to express thanks to individuals who may have
// inspired them, contributed research or data, or helped them during the
// writing process. Acknowledgments are a public thank you for the support
// and contributions of individuals who were involved in the project.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Section } from '../../interfaces/Section'

import { FileAlreadyExistsError } from '../../errors/Tree'

import { Context } from '../../Context'

import { Log } from '../../utils/Logging'
import { Tree } from '../../utils/Tree'
import { Yaml } from '../../utils/Yaml'

import { Heading4Adapter } from '../adapters/Text'
import { PageHeaderAdapter } from '../adapters/Page'
import { LandscapeAdapter } from '../adapters/Background'

import { PdfApi } from '../api/Pdf'

export class AcknowledgementsSection implements Section {
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
    public setNumeration(offset: number = 0) {}

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
        Context.getBook().acknowledgements.forEach(model => new Heading4Adapter(model).apply())
        new LandscapeAdapter().pad(2)
    }
}
