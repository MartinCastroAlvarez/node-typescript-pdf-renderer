// ----------------------------------------------------------------
// PURPOSE:
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
    public static brand: Brand = <Brand>Yaml.deserialise(
        <SerializedBrand>Yaml.read('@config/Brand.yaml')
    )
    public static pallete: Pallete = <Pallete>Yaml.deserialise(
        <SerializedPallete>Yaml.read('@config/Pallete.yaml')
    )
    public static typeface: Typeface = <Typeface>Yaml.deserialise(
        <SerializedTypeface>Yaml.read('@config/Typeface.yaml')
    )
    public static dimensions: Dimensions = <Dimensions>Yaml.deserialise(
        <SerializedDimensions>Yaml.read('@config/Dimensions.yaml')
    )
}
