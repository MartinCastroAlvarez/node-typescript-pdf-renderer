// ----------------------------------------------------------------

import { Section } from './Section'

export interface Feature {
    apply(section: Section): void
}
