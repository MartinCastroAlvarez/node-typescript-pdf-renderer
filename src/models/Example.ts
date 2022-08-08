// ----------------------------------------------------------------
// Purpose:
// This library implements the Example class.
// ----------------------------------------------------------------

import { SerializedExample } from '../serializers/Example'

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Example extends Text implements Model {}
