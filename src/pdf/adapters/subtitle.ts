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

export class SubtitleAdapter implements Adapter {
    public static adapt(document: any, text: string): void {
        Log.info("Adapting subtitle to PDF", text)
        if (text)
            document.text(
                text,
                {}
            )
    }
}
