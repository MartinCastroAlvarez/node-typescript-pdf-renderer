// ----------------------------------------------------------------
// Purpose:
// This library implements the Pallete class.
// ----------------------------------------------------------------

import { SerializedPallete } from '../serializers/Pallete'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

export class Pallete implements Model {
    private primary: string = ''
    private secondary: string = ''
    private tertiary: string = ''
    private white: string = ''
    private grey: string = ''
    private black: string = ''

    // Primary color getter and setter.
    getPrimary(): string { return this.primary }
    setPrimary(color: string) { this.primary = color }

    // Secondary color getter and setter.
    getSecondary(): string { return this.secondary }
    setSecondary(color: string) { this.secondary = color }

    // Tertiary color getter and setter.
    getTertiary(): string { return this.tertiary }
    setTertiary(color: string) { this.tertiary = color }

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
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.getPrimary()}>`
    }

    // JSON serializers.
   public serialize(): SerializedPallete {
        return {
            "Type": (this as any).constructor.name,
            "Primary": this.getPrimary(),
            "Secondary": this.getPrimary(),
            "Tertiary": this.getTertiary(),
            "White": this.getWhite(),
            "Black": this.getBlack(),
            "Grey": this.getGrey(),
        }
    }
    public unserialize(data: SerializedPallete): void {
        if (data) {
            Log.info('Loading Pallete', data)
            this.setPrimary(data['Primary'])
            this.setSecondary(data['Secondary'])
            this.setTertiary(data['Tertiary'])
            this.setWhite(data['White'])
            this.setBlack(data['Black'])
            this.setGrey(data['Grey'])
        }
    }
}
