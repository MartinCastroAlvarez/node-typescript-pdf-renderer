// ----------------------------------------------------------------
// Purpose:
// This class implements the Feature interface.
// ----------------------------------------------------------------

import { Language } from '../enums/Language'

import { Section } from './Section'

export interface Feature {
    apply(section: Section): void
}
