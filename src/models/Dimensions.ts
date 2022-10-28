// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Dimensions class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedDimensions } from '../serializers/Dimensions'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

export class Dimensions implements Model {
    private small: number = 8
    private normal: number = 11
    private title: number = 50
    private heading1: number = 28
    private heading2: number = 20
    private heading3: number = 15
    private heading4: number = 13
    private margin: number = 70
    private avatar: number = 50
    private padding: number = 8

    // Margin size getter and setter.
    getMargin(): number { return this.margin }
    setMargin(size: number) { this.margin = size }

    // Avatar size getter and setter.
    getAvatar(): number { return this.avatar }
    setAvatar(size: number) { this.avatar = size }

    // Padding size getter and setter.
    getPadding(): number { return this.padding }
    setPadding(size: number) { this.padding = size }

    // Normal size getter and setter.
    getNormal(): number { return this.normal }
    setNormal(size: number) { this.normal = size }

    // Small size getter and setter.
    getSmall(): number { return this.small }
    setSmall(size: number) { this.small = size }

    // Title size getter and setter.
    getTitle(): number { return this.title }
    setTitle(size: number) { this.title = size }

    // Heading size getter and setter.
    getHeading1(): number { return this.heading1 }
    setHeading1(size: number) { this.heading1 = size }

    // Heading size getter and setter.
    getHeading2(): number { return this.heading2 }
    setHeading2(size: number) { this.heading2 = size }

    // Heading size getter and setter.
    getHeading3(): number { return this.heading3 }
    setHeading3(size: number) { this.heading3 = size }

    // Heading size getter and setter.
    getHeading4(): number { return this.heading4 }
    setHeading4(size: number) { this.heading4 = size }

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
    public async build(): Promise<void> {
        Log.info('Preprocessing Dimensions', this)
        return new Promise((resolve, reject) => resolve())
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedDimensions {
        return {
            "Type": (this as any).constructor.name,
            "Normal": this.getNormal(),
            "Small": this.getSmall(),
            "Margin": this.getMargin(),
            "Avatar": this.getAvatar(),
            "Padding": this.getPadding(),
            "Title": this.getTitle(),
            "Heading1": this.getHeading1(),
            "Heading2": this.getHeading2(),
            "Heading3": this.getHeading3(),
            "Heading4": this.getHeading4(),
        }
    }
    public deserialise(data: SerializedDimensions): void {
        if (data) {
            Log.info('Unserialising Dimensions', data)
            this.setNormal(data.Normal)
            this.setSmall(data.Small)
            this.setMargin(data.Margin)
            this.setPadding(data.Padding)
            this.setAvatar(data.Avatar)
            this.setTitle(data.Title)
            this.setHeading1(data.Heading1)
            this.setHeading2(data.Heading2)
            this.setHeading3(data.Heading3)
            this.setHeading4(data.Heading4)
        }
    }
}
