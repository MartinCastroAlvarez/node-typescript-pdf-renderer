// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/adapter'

import { Config } from '../../config'
import { Log } from '../../logging'

export class TitleAdapter implements Adapter {
    public static adapt(document: any, text: string): void {
        Log.info("Adapting title to PDF", text)
        if (text)
            document
                .fontSize(30)
                .fillColor(Config.pallete.getPrimary())
                .font(Config.typeface.getBold())
                .text(
                text,
                {
                    align: 'center',
                    paragraphGap: 10,
                    lineBreak: true,
                }
            )
    }
}
