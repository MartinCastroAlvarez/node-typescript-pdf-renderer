// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Image class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

const sizeOf = require('image-size')

import { SerializedImage } from '../serializers/Image'

import { Orientation } from '../enums/Orientation'

import { Model } from '../interfaces/Model'

import { Editor } from '../utils/Editor'
import { Log } from '../utils/Logging'

import { File } from './File'
import { Text } from './Text'

import { ImageOrientationError, ImageProcessingError } from '../errors/Image'

export class Image extends File implements Model {
    private orientation: Orientation = Orientation.SQUARE
    public readonly legend: Text = new Text()

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.getPath()}>`
    }

    // Orientation getter and setter.
    public getOrientation(): Orientation {
        return this.orientation
    }
    public setOrientation(orientation: Orientation) {
        Log.info('Setting Image orientation', orientation)
        if (!orientation) {
            throw new ImageOrientationError(`Invalid image orientation: ${orientation}`)
        }
        this.orientation = orientation
    }
    public isSquare(): boolean { return this.getOrientation() === Orientation.SQUARE }
    public isLandscape(): boolean { return this.getOrientation() === Orientation.LANDSCAPE }
    public isPortrait(): boolean { return this.getOrientation() === Orientation.PORTRAIT }

    // Image size getter.
    public getWidth(): number { return sizeOf(this.getPath()).width }
    public getHeight(): number { return sizeOf(this.getPath()).height }

    // Ratio getter.
    public getRatio(): number {
        if (this.isLandscape()) {
            return 1.50
        } else if (this.isPortrait()) {
            return 0.75
        } else {
            return 1
        }
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
        Log.info('Preprocessing Image', this)
        await this.legend.build()
        if (this.getPath()) {
            // Cropping a landscape image.
            Log.info('Cropping Image', this)
            try {
                this.setPath(await Editor.ratio({
                    path: this.getPath(),
                    ratio: this.getRatio()
                }))
            } catch(err) {
                throw new ImageProcessingError('Failed to process image: ' + err.toString())
            }
        }
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedImage {
        return {
            "Type": (this as any).constructor.name,
            "Path": this.getPath(),
            "Orientation": this.getOrientation(),
            "Legend": this.legend.serialise(),
        }
    }
    public deserialise(data: SerializedImage): void {
        if (data) {
            Log.info('Unserialising Image', data)
            this.setPath(data.Path)
            data.Orientation = data.Orientation ? data.Orientation : Orientation.SQUARE
            this.setOrientation(Orientation[data.Orientation.toUpperCase()])
            if (data.Legend)
                this.legend.deserialise(data.Legend)
        }
    }
}
