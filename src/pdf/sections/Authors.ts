// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Config } from '../../Config'
import { Log } from '../../Logging'
import { Yaml } from '../../Yaml'

import { TextAdapter } from '../adapters/Text'
import { TitleAdapter } from '../adapters/Title'
import { SubtitleAdapter } from '../adapters/Subtitle'
import { AvatarAdapter } from '../adapters/Avatar'
import { LinkAdapter } from '../adapters/Link'

export class AuthorsSection extends PdfSection {
    public getTitle(): string { return 'Authors' }

    public build(): void {
        super.build()
        Log.info("Building book authors section", this.getBook())
        new TitleAdapter().adapt(this, Yaml.getString('@i18n/Authors.yaml'))
        for (let author of this.getBook().authors) {
            new AvatarAdapter().adapt(this, author.avatar)
            new SubtitleAdapter().adapt(this, author.name)
            new LinkAdapter().adapt(this, author.website)
            new LinkAdapter().adapt(this, author.email)
        }
        Log.info("Authors built successfully", this.getBook())
    }
}
