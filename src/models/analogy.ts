// ----------------------------------------------------------------
// Purpose:
// This library implements the Analogy class.
// ----------------------------------------------------------------

import { SerializedAnalogy } from '../serializers/analogy'

import { Model } from './base'
import { Text } from './text'

export class Analogy extends Text implements Model {}
