// ----------------------------------------------------------------

import { Section } from './Section'

export interface Feature {
    getSection(): Section
    setSection(section: Section): void
    toString(): string
    apply(): void
}
