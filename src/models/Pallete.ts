// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Pallete class.
//
// Models:
// This directory contiains the model of the data of this application.
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
    private darkGrey: string = ''
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

    // Dark Grey color getter and setter.
    getDarkGrey(): string { return this.darkGrey }
    setDarkGrey(color: string) { this.darkGrey = color }

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.getPrimary()}>`
    }

    // ----------------------------------------------------------------
    // PREPROCESSING STEP:
    // Preprocessing simply refers to perform series of operations to
    // transform or change data and cache the results before actually
    // using them. That includes:
    // - Data Cleaning.
    // - Dimensionality Reduction.
    // - Feature Engineering.
    // - Sampling Data.
    // - Data Transformation.
    // - Imbalanced Data.
    // ----------------------------------------------------------------
    public build(): Promise<void> {
        Log.info('Preprocessing Pallete', this)
        return new Promise((resolve, reject) => resolve())
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedPallete {
        return {
            "Type": (this as any).constructor.name,
            "Primary": this.getPrimary(),
            "Secondary": this.getPrimary(),
            "Tertiary": this.getTertiary(),
            "White": this.getWhite(),
            "Black": this.getBlack(),
            "Grey": this.getGrey(),
            "DarkGrey": this.getDarkGrey(),
        }
    }
    public deserialise(data: SerializedPallete): void {
        if (data) {
            Log.info('Unserialising Pallete', data)
            this.setPrimary(data.Primary)
            this.setSecondary(data.Secondary)
            this.setTertiary(data.Tertiary)
            this.setWhite(data.White)
            this.setBlack(data.Black)
            this.setGrey(data.Grey)
            this.setDarkGrey(data.DarkGrey)
        }
    }
}
