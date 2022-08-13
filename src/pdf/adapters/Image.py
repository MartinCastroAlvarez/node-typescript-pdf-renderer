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
import { Config } from '../../Config'

import { Image } from '../../models/Image'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class AvatarAdapter implements Adapter {
    private model: Image = new Image()
    private section: PdfSection = new PdfSection()
    private width: number = 100

    private getWidth(): number { return this.width }

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Image { return this.model }
    public setModel(model: Image) { this.model = model }

    public apply(): void {
        Log.info("Adapting avatar to PDF", this.getModel(), this.getSection())

        // Checking if link is empty.
        const path: string = this.getModel().getPath()
        if (!path) return

        // Space before the avatar.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Extracting current position.
        const left: number = this.getSection().getMarginLeft()
        const top: number = this.getSection().getCurrentVerticalPosition()

        // Updating document.
        //
        this.getSection().getDocument()
            .image(
                path,
                {
                    width: this.getWidth(),
                }
            )
            .rect(left, top, this.getWidth(), this.getWidth())
            .strokeColor(Config.pallete.getGrey())
            .stroke()

        // Space after the avtar.
        breaks.small()
    }
}
