// ----------------------------------------------------------------
// PURPOSE:
// This library defines the PersonalExperience model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { Model } from '../interfaces/Model'

import { Text } from './Text'

export class PersonalExperience extends Text implements Model {}
