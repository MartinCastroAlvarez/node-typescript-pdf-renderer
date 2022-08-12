// ----------------------------------------------------------------
// Purpose:
// This class implements the PDF section classes.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { PdfSection } from '../Section'

import { Log } from '../../utils/Logging'
import { Yaml } from '../../utils/Yaml'

import { AvatarAdapter } from '../adapters/Avatar'
import { LinkAdapter } from '../adapters/Link'
import { SubtitleAdapter } from '../adapters/Subtitle'
import { TextAdapter } from '../adapters/Text'

export class BiographySection extends PdfSection {
    public getTitle(): string { return this.constructor.name }

    public build(): void {
        super.build()
        Log.info("Building book authors section", this.getBook())
        for (let author of this.getBook().authors) {

            // Author avatar.
            let avatar: AvatarAdapter = new AvatarAdapter()
            avatar.setModel(author.avatar)
            avatar.setSection(this)
            avatar.apply()

            // Author name.
            let name: SubtitleAdapter = new SubtitleAdapter()
            name.setModel(author.name)
            name.setSection(this)
            name.apply()

            // Bio name.
            let bio: TextAdapter = new TextAdapter()
            bio.setModel(author.bio)
            bio.setSection(this)
            bio.apply()

            // Website name.
            let url: LinkAdapter = new LinkAdapter()
            url.setModel(author.website)
            url.setSection(this)
            url.apply()

            // Email name.
            let email: LinkAdapter = new LinkAdapter()
            email.setModel(author.email)
            email.setSection(this)
            email.apply()
        }
    }
}
