// ----------------------------------------------------------------
// Purpose:
// This class implements the Title adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { Text } from '../../models/Text'

import { Break } from '../features/Break'

import { EmptynessError } from '../../errors/Text'

import { PdfSection } from '../Section'

export class TitleAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Text { return this.model }
    public setModel(model: Text) { this.model = model }

    private getOptions(): object {
        return {
            align: 'left',
            lineBreak: true,
        }
    }

    private getString(): string {
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string)
            throw new EmptynessError('The title is empty!')
        return string
    }

    public apply(): void {
        Log.info("Adapting title to PDF", this.getModel(), this.getSection())

        // Space before the title.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Updating document.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getTitle())
            .fillColor(Config.pallete.getPrimary())
            .font(Config.typeface.getBold())
            .text(this.getString(), this.getOptions())

        // Space after the title.
        breaks.small()
    }
}
