// ----------------------------------------------------------------
// Purpose:
// This library implements the Definition class.
// ----------------------------------------------------------------

import { SerializedDefinition } from '../serializers/Definition'

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Definition extends Text implements Model {}
