// ----------------------------------------------------------------
// Purpose:
// This library implements the Typeface class.
// ----------------------------------------------------------------

import { SerializedTypeface } from '../serializers/Typeface'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

export class Typeface implements Model {
    private cover: string = ''
    private normal: string = ''
    private italic: string = ''
    private bold: string = ''

    // Normal font getter and setter.
    getNormal(): string { return this.normal }
    setNormal(font: string) { this.normal = font }

    // Bold font getter and setter.
    getBold(): string { return this.bold }
    setBold(font: string) { this.bold = font }

    // Cover font getter and setter.
    getCover(): string { return this.cover }
    setCover(font: string) { this.cover = font }

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
            "Cover": this.getCover(),
            "Italic": this.getItalic(),
        }
    }
    unserialize(data: SerializedTypeface): void {
        if (data) {
            Log.info('Loading Typeface', data)
            this.setNormal(data['Normal'])
            this.setBold(data['Bold'])
            this.setCover(data['Cover'])
            this.setItalic(data['Italic'])
        }
    }
}
