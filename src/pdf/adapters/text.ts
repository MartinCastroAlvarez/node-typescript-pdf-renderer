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

export class TextAdapter implements Adapter {
    public static adapt(document: any, text: string): void {
        Log.info("Adapting text to PDF", text)
        if (text)
            document
                .fillColor(Config.pallete.getBlack())
                .font(Config.typeface.getNormal())
                .text(
                text,
                {
                    align: 'justify',
                    lineBreak: true,
                }
            )
    }
}
