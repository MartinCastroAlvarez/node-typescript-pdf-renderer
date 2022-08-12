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
import { Log } from '../../Logging'

import { Story } from '../../models/Story'

import { Subtitle } from '../Subtitle'

import { PdfSection } from '../Section'

export class StoryAdapter implements Adapter {
    private model: Story = new Story()
    private section: PdfSection = new PdfSection()

    getSection(): PdfSection { return this.section }
    setSection(section: PdfSection) { this.section = section }

    getModel(): Story { return this.model }
    setModel(model: Story) { this.model = model }

    apply(): void {
        Log.info("Adapting story to PDF", this.getModel(), this.getSection())

        // Story title.
        const title: SubtitleAdapter = new SubtitleAdapter()
        title.setSection(this.getSection()) 
        title.setModel(this.getModel().title)
        title.apply()

        // Story body.
        // FIXME
    }
}
