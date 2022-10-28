// ----------------------------------------------------------------
// PURPOSE:
// This class implements the HTML Product class.
// ----------------------------------------------------------------

import { Product } from '../interfaces/Product'
import { Section } from '../interfaces/Section'


export class Html implements Product {
    public readonly sections: Array<Section> = new Array<Section>()

    // Building product and all its sections.
    public async build() {
    }

    // Rending product.
    public async merge(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(path)
        })
    }
}
