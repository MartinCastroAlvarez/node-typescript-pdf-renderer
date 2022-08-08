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


export class AvatarAdapter implements Adapter {
    apply(section: Section, model: Model): void {
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
