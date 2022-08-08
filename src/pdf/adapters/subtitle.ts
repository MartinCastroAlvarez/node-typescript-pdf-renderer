// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/adapter'
import { Product } from '../../interfaces/product'
import { Model } from '../../interfaces/model'

import { Config } from '../../config'
import { Log } from '../../logging'

export class SubtitleAdapter implements Adapter {
    adapt(product: Product, model: Model): void {
        /*
        Log.info("Adapting subtitle to PDF", text)
        if (text)
            document
                .fontSize(Config.dimensions.getSubtitle())
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                    text,
                    {
                        align: 'center',
                        paragraphGap: Config.dimensions.getSubtitle(),
                        lineBreak: true,
                    }
                )
        */
    }
}
