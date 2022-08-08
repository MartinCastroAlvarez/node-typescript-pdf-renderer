// ----------------------------------------------------------------
// Purpose:
// This library implements the Joke class.
// ----------------------------------------------------------------

import { SerializedJoke } from '../serializers/Joke'

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Joke extends Text implements Model {}
