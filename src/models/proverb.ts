// ----------------------------------------------------------------
// Purpose:
// This library implements the Proverb class.
// ----------------------------------------------------------------

import { SerializedProverb } from '../serializers/proverb'

import { Model } from './base'
import { Text } from './text'

export class Proverb extends Text implements Model {}
