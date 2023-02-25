// ----------------------------------------------------------------
// PURPOSE:
// The table of contents outlines the book’s body of work by dividing it into
// chapters, and sometimes sections or parts. Much thought goes into the titles
// of the chapters, as the chapter titles can set the tone for the book. When
// someone quickly glances through the table of contents, they should be able
// to discern the scope and basic theme of the book.
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

import { Heading2Adapter } from '../adapters/Text'
import { IndexAdapter } from '../adapters/Index'
import { PageNumberAdapter, PageHeaderAdapter } from '../adapters/Page'
import { LandscapeAdapter } from '../adapters/Background'

import { PdfApi } from '../api/Pdf'

export class TableOfContentsSection implements Section {
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
        new Heading2Adapter(Yaml.getString('@i18n/TableOfContents.yaml')).apply()
    }

    // ----------------------------------------------------------------
    // Method responsible for populating the table of contents with
    // a list of Sections as references.
    // ----------------------------------------------------------------
    public index(sections: Array<Section>): void {
        Log.info("Indexing sections", Context.getProduct().toString(), this.toString())
        let offset: number = 0
        sections.filter(section => section.getIndex().length).forEach(section => {
            Context.setSection(this)

            // Adding a new line to the Table of Contents.
            const index: IndexAdapter = new IndexAdapter()
            index.setSection(section)
            index.setOffset(offset)
            index.apply()

            // Adding a page number and header on that other section.
            section.setNumeration(offset)

            // Moving the offset.
            offset += (<PdfApi>section.getApi()).getTotalPages()
        })
        Context.setSection(this)
        new LandscapeAdapter().pad(2)
        sections.filter(section => section.getHeader().length).forEach(section => section.setHeader())
        Log.info("Index built successfully", Context.getProduct().toString(), this.toString())
    }
}
