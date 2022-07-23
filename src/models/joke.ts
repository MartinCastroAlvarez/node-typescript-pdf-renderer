// ----------------------------------------------------------------
// Purpose:
// This library implements the Joke class.
// ----------------------------------------------------------------

import { SerializedJoke } from '../serializers/joke'

import { Model } from '../interfaces/model'

import { Text } from './text'

export class Joke extends Text implements Model {}
