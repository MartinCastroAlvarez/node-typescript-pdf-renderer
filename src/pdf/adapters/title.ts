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

import { Text } from '../../models/text'

import { Config } from '../../config'
import { Log } from '../../logging'

import { Pdf } from '../product'

export class TitleAdapter implements Adapter {
    adapt(product: Product, model: Model): void {
        Log.info("Adapting title to PDF", model)
        const pdf: Pdf = <Pdf>product
        const text: Text = <Text>model
        const string: string = text.get(pdf.getLanguage())
        if (string) {
            pdf.getDocument()
                .fontSize(Config.dimensions.getTitle())
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                    string,
                    {
                        align: 'center',
                        paragraphGap: Config.dimensions.getTitle(),
                        lineBreak: true,
                    }
                )
        }
    }
}
