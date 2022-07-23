// ----------------------------------------------------------------
// Purpose:
// This library implements the Subtitle class.
// ----------------------------------------------------------------

import { SerializedSubtitle } from '../serializers/subtitle'

import { Model } from '../interfaces/model'

import { Text } from './text'

export class Subtitle extends Text implements Model {}
