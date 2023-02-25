// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Typeface model.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedTypeface } from '../serializers/Typeface'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

export class Typeface implements Model {
    private title: string = ''
    private normal: string = ''
    private italic: string = ''
    private console: string = ''
    private cover: string = ''
    private bold: string = ''

    // Normal font getter and setter.
    getNormal(): string { return this.normal }
    setNormal(font: string) { this.normal = font }

    // Console font getter and setter.
    getConsole(): string { return this.console }
    setConsole(font: string) { this.console = font }

    // Bold font getter and setter.
    getBold(): string { return this.bold }
    setBold(font: string) { this.bold = font }

    // Title font getter and setter.
    getTitle(): string { return this.title }
    setTitle(font: string) { this.title = font }

    // Cover font getter and setter.
    getCover(): string { return this.cover }
    setCover(font: string) { this.cover = font }

    // Italic font getter and setter.
    getItalic(): string { return this.italic }
    setItalic(font: string) { this.italic = font }

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.getNormal()}>`
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
        Log.info('Preprocessing Typeface', this)
        return new Promise((resolve, reject) => resolve())
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedTypeface {
        return {
            "Type": (this as any).constructor.name,
            "Normal": this.getNormal(),
            "Bold": this.getBold(),
            "Title": this.getTitle(),
            "Cover": this.getCover(),
            "Console": this.getConsole(),
            "Italic": this.getItalic(),
        }
    }
    public deserialise(data: SerializedTypeface): void {
        if (data) {
            Log.info('Unserialising Typeface', data)
            this.setNormal(data.Normal)
            this.setBold(data.Bold)
            this.setConsole(data.Console)
            this.setTitle(data.Title)
            this.setCover(data.Cover)
            this.setItalic(data.Italic)
        }
    }
}
