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

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { Text } from '../../models/Text'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

import { EmptynessError } from '../../errors/Text'

export class SubtitleAdapter implements Adapter {
    private model: Text = new Text()
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Text { return this.model }
    public setModel(model: Text ) { this.model = model }

    private getOptions(): object {
        return {
            align: 'left',
            lineBreak: true,
        }
    }

    private getHeight(): number {
        return this.getSection().getDocument()
            .fontSize(Config.dimensions.getSubtitle())
            .font(Config.typeface.getBold())
            .heightOfString(this.getString(), this.getOptions()) +
        2 * Config.dimensions.getBreak()
    }

    private getString(): string {
        const string: string = this.getModel().get(this.getSection().getLanguage())
        if (!string)
            throw new EmptynessError('The subtitle is empty!')
        return string
    }

    public apply(): void {
        Log.info("Adapting subtitle to PDF", this.getModel(), this.getSection())

        // Space before the subtitle.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        breaks.small()

        // Checking if the title is at the bottom of a page.
        this.break()

        // Updating document.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getSubtitle())
            .fillColor(Config.pallete.getSecondary())
            .font(Config.typeface.getBold())
            .text(this.getString(), this.getOptions())

        // Space after the subtitle.
        breaks.small()
    }

    // Functikon responsible for inserting a new page if it looks like
    // the grey box is going to end too close to the bottom.
    private break(): void {
        const estimated: number = this.getSection().getCurrentVerticalPosition() + this.getHeight()
        const maximum: number = this.getSection().getHeight() * 0.8 - this.getSection().getMarginBottom()
        Log.info("Checking if the title is very low in the current page", estimated, maximum)
        if (estimated > maximum)
            this.getSection().addPage()
    }
}
