// ----------------------------------------------------------------
// Purpose:
// This library implements the Question class.
// ----------------------------------------------------------------

import { SerializedQuestion } from '../serializers/Question'

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Question extends Text implements Model {}
