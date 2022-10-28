// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Hero model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class Hero extends Text implements Model {}
