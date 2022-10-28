// ----------------------------------------------------------------
// PURPOSE:
// This class implements the PDF section classes.
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

import { TitleAdapter, Heading2Adapter, Heading3Adapter, Heading4Adapter } from '../adapters/Text'
import { CoverAdapter } from '../adapters/Background'

import { PdfApi } from '../api/Pdf'

export class CoverSection implements Section {
    private api: PdfApi = new PdfApi()

    // Api getter and setter.
    getApi(): PdfApi { return this.api }

    // String serializer.
    public toString(): string { return `${this.constructor.name}` }

    // ----------------------------------------------------------------
    // If these function return an empty list of strings, then this
    // section contains no page header.
    // ----------------------------------------------------------------
    public getHeader(): Array<string> { return [] }
    public setHeader() {}

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

        // Cover background.
        new CoverAdapter().apply()

        // Book authors.
        Context.getBook().authors.forEach(author => {
            const name: Heading3Adapter = new Heading3Adapter(author.name)
            name.invert()
            name.apply()
        })

        // Book title.
        const title: TitleAdapter = new TitleAdapter(Context.getBook().title)
        title.invert()
        title.apply()

        // Book subtitle.
        const subtitle: Heading2Adapter = new Heading2Adapter(Context.getBook().subtitle)
        subtitle.invert()
        subtitle.apply()

        // Brand icon.
        const icon: Heading4Adapter = new Heading4Adapter(Config.brand.icon)
        icon.invert()
        icon.apply()

        // Brand title.
        const brand: Heading4Adapter = new Heading4Adapter(Config.brand.title)
        brand.invert()
        brand.apply()
    }
}
