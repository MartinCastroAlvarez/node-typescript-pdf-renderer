// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Log } from '../../utils/Logging'

import { Image } from '../../models/Image'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class AvatarAdapter implements Adapter {
    private model: Image = new Image()
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Image { return this.model }
    setModel(model: Image) { this.model = model }

    apply(): void {
        Log.info("Adapting avatar to PDF", this.getModel(), this.getSection())

        // Checking if link is empty.
        const path: string = this.getModel().getPath()
        if (!path) return

        // Space before the avatar.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Updating document.
        this.getSection().getDocument().text(path)

        // Space after the avtar.
        breaks.small()
    }
}
