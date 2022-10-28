// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Proverb model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Proverb extends Text implements Model {}
