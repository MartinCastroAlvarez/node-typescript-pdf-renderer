// ----------------------------------------------------------------
// Purpose:
// This library implements the Analogy class.
// ----------------------------------------------------------------

import { SerializedAnalogy } from '../serializers/Analogy'

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Analogy extends Text implements Model {}
