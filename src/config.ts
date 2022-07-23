// ----------------------------------------------------------------
// Purpose:
// This class implements the Config class.
// ----------------------------------------------------------------

import { Yaml } from './yaml'

import { Brand } from './models/brand'
import { Pallete } from './models/pallete'
import { Typeface } from './models/typeface'

import { SerializedBrand } from './serializers/brand'
import { SerializedPallete } from './serializers/pallete'
import { SerializedTypeface } from './serializers/typeface'

export class Config {
    public readonly brand: Brand
    public readonly pallete: Pallete
    public readonly typeface: Typeface

    constructor() {
        this.brand = new Brand()
        this.pallete = new Pallete()
        this.typeface = new Typeface()
    }

    load(): void {
        let yaml: Yaml = new Yaml()
        this.brand.unserialize(<SerializedBrand>yaml.read('@config/Brand.yaml'))
        this.pallete.unserialize(<SerializedPallete>yaml.read('@config/Pallete.yaml'))
        this.typeface.unserialize(<SerializedTypeface>yaml.read('@config/Typeface.yaml'))
    }
}
