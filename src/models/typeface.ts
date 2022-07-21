// ----------------------------------------------------------------
// Purpose:
// This library implements the Typeface class.
// ----------------------------------------------------------------

import { SerializedTypeface } from '../serializers/typeface'

import { Model } from './base'

export class Typeface implements Model {
    private normal: string
    private italic: string
    private bold: string

    // Lazy constructor.
    constructor() {
        this.normal = ''
        this.bold = ''
        this.italic = ''
    }

    // Normal font getter and setter.
    getNormal(): string { return this.normal }
    setNormal(font: string) { this.normal = font }

    // Bold font getter and setter.
    getBold(): string { return this.bold }
    setBold(font: string) { this.bold = font }

    // Italic font getter and setter.
    getItalic(): string { return this.italic }
    setItalic(font: string) { this.italic = font }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getNormal()}>`
    }

    // JSON serializers.
    serialize(): SerializedTypeface {
        return {
            "Type": (this as any).constructor.name,
            "Normal": this.getNormal(),
            "Bold": this.getBold(),
            "Italic": this.getItalic(),
        }
    }
    unserialize(data: SerializedTypeface): void {
        console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
        if (data) {
            this.setNormal(data['Normal'])
            this.setBold(data['Bold'])
            this.setItalic(data['Italic'])
        }
    }
}
