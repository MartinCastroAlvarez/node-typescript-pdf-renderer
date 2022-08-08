// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from './section'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

import { TextAdapter } from '../adapters/text'
import { TitleAdapter } from '../adapters/title'
import { SubtitleAdapter } from '../adapters/subtitle'
import { AvatarAdapter } from '../adapters/avatar'
import { LinkAdapter } from '../adapters/link'

export class AuthorsSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book authors section", this.getBook())
        TitleAdapter.adapt(this, Yaml.getString('@i18n/Authors.yaml'), this.getLanguage())
        for (let author of this.getBook().authors) {
            AvatarAdapter.adapt(this, author.avatar, this.getLanguage())
            SubtitleAdapter.adapt(this, author.name, this.getLanguage())
            LinkAdapter.adapt(this, author.website, this.getLanguage())
            LinkAdapter.adapt(this, author.email, this.getLanguage())
        }
    }
}
