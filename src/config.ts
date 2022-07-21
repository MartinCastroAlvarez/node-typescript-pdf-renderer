// ----------------------------------------------------------------
// Purpose:
// This class implements the Config class.
// ----------------------------------------------------------------

import { Yaml } from './yaml'
import { Tree } from './tree'

export class Config {
    public readonly brand: Brand

    constructor() {
        this.brand: = new Brand()
    }

    def load(): Brand {
        let brand: Brand = new Brand()
    }
}
