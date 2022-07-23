// ----------------------------------------------------------------
// Purpose:
// This library implements the Title class.
// ----------------------------------------------------------------

import { SerializedTitle } from '../serializers/title'

import { Model } from '../interfaces/model'

import { Text } from './text'

export class Title extends Text implements Model {}
