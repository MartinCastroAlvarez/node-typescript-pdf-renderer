// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Product interface.
// ----------------------------------------------------------------

import { Section }  from './Section'

export interface Product {
    toString(): string
    sections: Array<Section>
    build(): void
    merge(path: string): Promise<string>
}
