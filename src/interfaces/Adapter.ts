// ----------------------------------------------------------------

import { Model } from './Model'
import { Section } from './Section'

export interface Adapter {
    apply(section: Section, model: Model): void
}
