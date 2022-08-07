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

export class AuthorsSection extends PdfSection {
    public build(): void {
        super.build()
        Log.info("Building book authors section", this.getBook())
        TitleAdapter.adapt(this.getDocument(), Yaml.getString('@i18n/Authors.yaml').get(this.getLanguage()))
        for (let author of this.getBook().authors) {
            AvatarAdapter.adapt(this.getDocument(), author.logo.getPath())
            SubtitleAdapter.adapt(this.getDocument(), author.getName())
            TextAdapter.adapt(this.getDocument(), author.getWebsite())
            TextAdapter.adapt(this.getDocument(), author.getEmail())
        }
    }
}
