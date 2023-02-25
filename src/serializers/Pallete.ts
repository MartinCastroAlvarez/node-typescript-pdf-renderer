// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Pallete interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedPallete extends Serialized {
    Primary?: string
    Secondary?: string
    Tertiary?: string
    White?: string
    Black?: string
    Grey?: string
    DarkGrey?: string
}
