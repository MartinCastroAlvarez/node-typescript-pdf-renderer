// ----------------------------------------------------------------
// Purpose:
// This class implements the Config class.
// ----------------------------------------------------------------

import { Yaml } from './yaml'

import { Brand } from './models/brand'
import { Pallete } from './models/pallete'
import { Typeface } from './models/typeface'

export class Config {
    public readonly brand: Brand
    public readonly pallete: Pallete
    public readonly typeface: Typeface

    constructor() {
        let yaml: Yaml = new Yaml()
        this.brand = <Brand>yaml.unserialize(yaml.read('@config/Brand.yaml'))
        this.pallete = <Pallete>yaml.unserialize(yaml.read('@config/Pallete.yaml'))
        this.typeface = <Typeface>yaml.unserialize(yaml.read('@config/Typeface.yaml'))
    }
}
