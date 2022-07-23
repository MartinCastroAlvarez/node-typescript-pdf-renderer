// ----------------------------------------------------------------
// Purpose:
// This library implements the Analogy class.
// ----------------------------------------------------------------

import { SerializedAnalogy } from '../serializers/analogy'

import { Model } from '../interfaces/model'

import { Text } from './text'

export class Analogy extends Text implements Model {}
