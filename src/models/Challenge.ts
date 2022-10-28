// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Challenge model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Challenge extends Text implements Model {}
