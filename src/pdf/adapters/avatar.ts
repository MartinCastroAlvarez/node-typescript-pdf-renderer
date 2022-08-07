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

export class AvatarAdapter implements Adapter {
    public static adapt(document: any, path: string): void {
        Log.info("Adapting logo to PDF", path)
        if (path)
            document.text(
                path,
                {}
            )
    }
}
