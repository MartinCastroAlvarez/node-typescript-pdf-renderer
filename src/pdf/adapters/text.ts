// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Yaml } from '../yaml'

import { Adapter } from '../interfaces/adapter'

import { Text } from '../models'

import { Config } from '../config'
import { Log } from '../logging'

export class TextAdapter implements Adapter {
    public adapt(document: any, text: Text): void {
        super.build()
        Log.info("Building book legal warning", this.getBook())
        this.getDocument().text(
            Yaml.getString('@i18n/Legal.yaml').get(this.getLanguage()),
            {}
        )
    }
}
