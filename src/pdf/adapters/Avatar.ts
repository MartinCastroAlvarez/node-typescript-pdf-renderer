// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'

import { Log } from '../../Logging'

import { Image } from '../../models/Image'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class AvatarAdapter implements Adapter {
    apply(section: Section, model: Model): void {
        Log.info("Adapting avatar to PDF", model)

        // Checking if link is empty.
        const path: string = (model as Image).getPath()
        if (!path) return

        // Space before the avatar.
        new Break().apply(section)

        // Updating document.
        const document: any = (section as PdfSection).getDocument()
        document
            .text(path)

        // Space after the avtar.
        new Break().apply(section)

    }
}
