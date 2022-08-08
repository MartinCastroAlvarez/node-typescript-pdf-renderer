// ----------------------------------------------------------------
// Purpose:
// This class implements the link adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/adapter'
import { Section } from '../../interfaces/section'
import { Model } from '../../interfaces/model'

import { Config } from '../../config'
import { Log } from '../../logging'

export class LinkAdapter implements Adapter {
    adapt(section: Section, model: Model): void {
        /*
        Log.info("Adapting link to PDF", text)
        if (text) {
            document
                .rect(45, 165, document.page.width - 50 * 2, 22)
                .fill(Config.pallete.getGrey())
            document
                .fontSize(Config.dimensions.getNormal())
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                    text,
                    {
                        align: 'center',
                        paragraphGap: Config.dimensions.getNormal(),
                        underline: true,
                        link: url,
                        lineBreak: true,
                    }
                )
        }
        */
    }
}
