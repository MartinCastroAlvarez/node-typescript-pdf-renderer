// ----------------------------------------------------------------
// Purpose:
// This class implements the Config class.
// ----------------------------------------------------------------

import { Yaml } from './utils/Yaml'

import { Brand } from './models/Brand'
import { Dimensions } from './models/Dimensions'
import { Pallete } from './models/Pallete'
import { Typeface } from './models/Typeface'

import { SerializedBrand } from './serializers/Brand'
import { SerializedDimensions } from './serializers/Dimensions'
import { SerializedPallete } from './serializers/Pallete'
import { SerializedTypeface } from './serializers/Typeface'

export abstract class Config {
    public static brand: Brand = <Brand>Yaml.unserialize(
        <SerializedBrand>Yaml.read('@config/Brand.yaml')
    )
    public static pallete: Pallete = <Pallete>Yaml.unserialize(
        <SerializedPallete>Yaml.read('@config/Pallete.yaml')
    )
    public static typeface: Typeface = <Typeface>Yaml.unserialize(
        <SerializedTypeface>Yaml.read('@config/Typeface.yaml')
    )
    public static dimensions: Dimensions = <Dimensions>Yaml.unserialize(
        <SerializedDimensions>Yaml.read('@config/Dimensions.yaml')
    )
}
