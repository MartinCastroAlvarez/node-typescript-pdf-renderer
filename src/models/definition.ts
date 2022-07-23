// ----------------------------------------------------------------
// Purpose:
// This library implements the Definition class.
// ----------------------------------------------------------------

import { SerializedDefinition } from '../serializers/definition'

import { Model } from '../interfaces/model'

import { Text } from './text'

export class Definition extends Text implements Model {}
