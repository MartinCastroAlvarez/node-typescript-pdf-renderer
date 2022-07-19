// ----------------------------------------------------------------
// Purpose:
// This library implements the Proverb class.
// ----------------------------------------------------------------

import { Model } from './base'
import { Block } from './block'
import { Model } from './base'
import { Text } from './text'

export class Proverb extends Text implements Block, Model {
    public readonly TYPE: string = 'Proverb'
}
