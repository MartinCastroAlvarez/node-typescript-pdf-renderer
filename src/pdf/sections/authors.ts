// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Pdf } from '../product'

import { Config } from '../../config'
import { Log } from '../../logging'
import { Yaml } from '../../yaml'

import { TextAdapter } from '../adapters/text'
import { TitleAdapter } from '../adapters/title'
import { SubtitleAdapter } from '../adapters/subtitle'
import { AvatarAdapter } from '../adapters/avatar'
import { LinkAdapter } from '../adapters/link'

export class AuthorsSection extends Pdf {
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
    }
}
