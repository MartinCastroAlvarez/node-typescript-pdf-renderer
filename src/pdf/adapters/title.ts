// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/adapter'
import { Section } from '../../interfaces/section'
import { Model } from '../../interfaces/model'

import { Language } from '../../enums/language'

import { Config } from '../../config'
import { Log } from '../../logging'

export class TitleAdapter implements Adapter {
    static adapt(section: Section, model: Model, language: Language): void {
        /*
        Log.info("Adapting title to PDF", model)
        if (text)
            document
                .fontSize(Config.dimensions.getTitle())
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                    text,
                    {
                        align: 'center',
                        paragraphGap: Config.dimensions.getTitle(),
                        lineBreak: true,
                    }
                )
        */
    }
}
