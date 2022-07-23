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

export abstract class Config {
    public static brand: Brand = <Brand>Yaml.unserialize(
        <SerializedBrand>Yaml.read('@config/Brand.yaml')
    )
    public static pallete: Pallete = <Pallete>Yaml.unserialize(
        <SerializedPallete>Yaml.read('@config/Pallete.yaml')
    )
    public static typeface: Typeface= <Typeface>Yaml.unserialize(
        <SerializedTypeface>Yaml.read('@config/Typeface.yaml')
    )
}
