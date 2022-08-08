// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../Logging'
import { Yaml } from '../../Yaml'

import { AvatarAdapter } from '../adapters/Avatar'
import { LinkAdapter } from '../adapters/Link'
import { SubtitleAdapter } from '../adapters/Subtitle'
import { TitleAdapter } from '../adapters/Title'

export class AuthorsSection extends PdfSection {
    public getTitle(): string { return 'Authors' }

    public build(): void {
        super.build()
        Log.info("Building book authors section", this.getBook())
        new TitleAdapter().apply(this, Yaml.getString('@i18n/Authors.yaml'))
        for (let author of this.getBook().authors) {
            new AvatarAdapter().apply(this, author.avatar)
            new SubtitleAdapter().apply(this, author.name)
            new LinkAdapter().apply(this, author.website)
            new LinkAdapter().apply(this, author.email)
        }
        Log.info("Authors built successfully", this.getBook())
    }
}
