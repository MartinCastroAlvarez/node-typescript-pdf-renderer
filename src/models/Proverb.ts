// ----------------------------------------------------------------
// Purpose:
// This library implements the Proverb class.
// ----------------------------------------------------------------

import { SerializedProverb } from '../serializers/Proverb'

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Proverb extends Text implements Model {}
