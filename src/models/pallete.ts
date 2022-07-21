// ----------------------------------------------------------------
// Purpose:
// This library implements the Pallete class.
// ----------------------------------------------------------------

import { SerializedPallete } from '../serializers/pallete'

import { Model } from './base'

export class Pallete implements Model {
    private primary: string
    private secondary: string
    private white: string
    private grey: string
    private black: string

    // Lazy constructor.
    constructor() {
        this.primary = ''
        this.secondary = ''
        this.white = ''
        this.grey = ''
        this.black = ''
    }

    // Primary color getter and setter.
    getPrimary(): string { return this.primary }
    setPrimary(color: string) { this.primary = color }

    // Secondary color getter and setter.
    getSecondary(): string { return this.secondary }
    setSecondary(color: string) { this.secondary = color }

    // White color getter and setter.
    getWhite(): string { return this.white }
    setWhite(color: string) { this.white = color }

    // Black color getter and setter.
    getBlack(): string { return this.black }
    setBlack(color: string) { this.black = color }

    // Grey color getter and setter.
    getGrey(): string { return this.grey }
    setGrey(color: string) { this.grey = color }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getPrimary()}>`
    }

    // JSON serializers.
    toJson(): SerializedPallete {
        return {
            "Type": (this as any).constructor.name,
            "Primary": this.getPrimary(),
            "Secondary": this.getPrimary(),
            "White": this.getWhite(),
            "Black": this.getBlack(),
            "Grey": this.getGrey(),
        }
    }
    fromJson(data: SerializedPallete): void {
        console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
        if (data) {
            this.getPrimary(data['Primary'])
            this.getSecondary(data['Secondary'])
            this.getWhite(data['White'])
            this.getBlack(data['Black'])
            this.getGrey(data['Grey'])
        }
    }
}
