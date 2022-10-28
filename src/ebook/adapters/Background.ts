// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Background adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'

import { Log } from '../../utils/Logging'
import { Random } from '../../utils/Random'
import { Tree } from '../../utils/Tree'
import { Yaml } from '../../utils/Yaml'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { PdfApi } from '../api/Pdf'

export class CoverAdapter implements Adapter {
    // ----------------------------------------------------------------
    // Main method responsible for updating the current section of the
    // product with the new content.
    //
    // The adapter design pattern allows otherwise incompatible classes
    // to work together by converting the interface of one class into
    // an interface expected by the clients.
    //
    // An adapter can be used when the wrapper must respect a particular
    // interface and must support polymorphic behavior.
    // ----------------------------------------------------------------
    public apply() {
        Log.info("Adding background to PDF", Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        api.addRectangle({
            width: api.getWidth(),
            height: api.getHeight(),
            x: 0,
            y: 0,
            color1: Config.pallete.getPrimary(),
            color2: Config.pallete.getSecondary(),
        })
    }
}

export class LandscapeAdapter implements Adapter {
    // ----------------------------------------------------------------
    // Main method responsible for adding the text and the padding
    // to the PDF document.
    // ----------------------------------------------------------------
    public apply() {
        Log.info("Adding landscape to PDF", Context.getSection())

        const api: PdfApi = Context.getApi() as PdfApi

        // Collecting landscapes.
        const directory: string = Yaml.dereference('@image/landscapes')
        const landscapes: Array<string> = Tree.list(directory)

        // Choosing a random landscape.
        const path: string = Random.choice(landscapes)
        const fullPath: string = Tree.join(directory, path)

        // Adding the landscapes.
        api.addImage({
            path: fullPath,
            x: 0,
            y: 0,
            width: api.getWidth(),
            height: api.getHeight(),
        })

        Log.info("Adapted landscape to PDF", Context.getSection())
    }

    // ----------------------------------------------------------------
    // Padding book with landscapes.
    // ----------------------------------------------------------------
    pad(pages: number = 2) {
        const api: PdfApi = Context.getApi() as PdfApi
        while (api.getTotalPages() % pages !== 0) {
            api.addUnnumberedPage()
            this.apply()
        }
    }
}
