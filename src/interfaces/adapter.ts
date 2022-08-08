// ----------------------------------------------------------------
// Purpose:
// This class implements the Adapter interface.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Model } from './model'
import { Section } from './section'

export interface Adapter {
    adapt(section: Section, model: Model, language: Language): void
}
