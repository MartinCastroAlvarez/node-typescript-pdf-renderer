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

export function info()
export enum Console {
    Reset = "\x1b[0m"
    Bright = "\x1b[1m"
    Dim = "\x1b[2m"
    Underscore = "\x1b[4m"
    Blink = "\x1b[5m"
    Reverse = "\x1b[7m"
    Hidden = "\x1b[8m"
    FgBlack = "\x1b[30m"
    FgRed = "\x1b[31m"
    FgGreen = "\x1b[32m"
    FgYellow = "\x1b[33m"
    FgBlue = "\x1b[34m"
    FgMagenta = "\x1b[35m"
    FgCyan = "\x1b[36m"
    FgWhite = "\x1b[37m"
    BgBlack = "\x1b[40m"
    BgRed = "\x1b[41m"
    BgGreen = "\x1b[42m"
    BgYellow = "\x1b[43m"
    BgBlue = "\x1b[44m"
    BgMagenta = "\x1b[45m"
    BgCyan = "\x1b[46m"
    BgWhite = "\x1b[47m"
}

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
