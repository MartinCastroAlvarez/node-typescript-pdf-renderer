// ----------------------------------------------------------------
// Purpose:
// This library implements the Example class.
// ----------------------------------------------------------------

import { SerializedExample } from '../serializers/example'

import { Model } from './base'
import { Text } from './text'

export class Example extends Text implements Model {}
