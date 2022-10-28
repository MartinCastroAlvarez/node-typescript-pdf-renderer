// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Question model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Question extends Text implements Model {}
