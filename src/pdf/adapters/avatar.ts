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

export class AvatarAdapter implements Adapter {
    static adapt(section: Section, model: Model, language: Language): void {
        /*
        Log.info("Adapting logo to PDF", path)
        if (path)
            document
                .fontSize(Config.dimensions.getNormal())
                .fillColor(Config.pallete.getBlack())
                .font(Config.typeface.getNormal())
                .text(
                    path,
                    {
                        align: 'justify',
                        paragraphGap: Config.dimensions.getNormal(),
                        lineBreak: true,
                    }
                )
        */
    }
}
