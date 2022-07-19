// ----------------------------------------------------------------
// Purpose:
// This library implements the Question class.
// ----------------------------------------------------------------

import { SerializedQuestion } from '../serializers/question'

import { Model } from './base'
import { Text } from './text'

export class Question extends Text implements Model {}
