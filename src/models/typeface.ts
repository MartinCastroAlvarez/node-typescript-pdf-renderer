// ----------------------------------------------------------------
// Purpose:
// This library implements the Typeface class.
// ----------------------------------------------------------------

import { SerializedTypeface } from '../serializers/typeface'

import { Model } from './base'

export class Typeface implements Model {
    private normal: string
    private italics: string
    private bold: string

    // Lazy constructor.
    constructor() {
        this.normal = ''
        this.bold = ''
        this.italics = ''
    }

    // Normal font getter and setter.
    getNormal(): string { return this.normal }
    setNormal(font: string) { this.normal = font }

    // Bold font getter and setter.
    getBold(): string { return this.bold }
    setBold(font: string) { this.bold = font }

    // Italic font getter and setter.
    getItalics(): string { return this.italics }
    setItalics(font: string) { this.italics = font }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getNormal()}>`
    }

    // JSON serializers.
    serialize(): SerializedPallete {
        return {
            "Type": (this as any).constructor.name,
            "Normal": this.getNormal(),
            "Bold": this.getBold(),
            "Italics": this.getItalics(),
        }
    }
    unserialize(data: SerializedPallete): void {
        console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
        if (data) {
            this.getNormal(data['Normal'])
            this.getBold(data['Bold'])
            this.getItalics(data['Italics'])
        }
    }
}
