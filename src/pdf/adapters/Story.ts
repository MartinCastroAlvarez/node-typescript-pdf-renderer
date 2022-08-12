// ----------------------------------------------------------------
// Purpose:
// This class implements the Story adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'
import { Section } from '../../interfaces/Section'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { Story } from '../../models/Story'

import { PdfSection } from '../Section'

import { SubtitleAdapter } from './Subtitle'
import { AnyAdapter } from './Any'

export class StoryAdapter implements Adapter {
    private model: Story = new Story()
    private section: PdfSection = new PdfSection()

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Story { return this.model }
    public setModel(model: Story) { this.model = model }

    public apply(): void {
        Log.info("Adapting story to PDF", this.getModel(), this.getSection())

        // Story title.
        const title: SubtitleAdapter = new SubtitleAdapter()
        title.setSection(this.getSection()) 
        title.setModel(this.getModel().title)
        title.apply()

        // Story body.
        for (let model of this.getModel().blocks) {
            let adapter: AnyAdapter = new AnyAdapter()
            adapter.setModel(model)
            adapter.setSection(this.getSection())
            adapter.apply()
        }
    }
}
