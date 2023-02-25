// ----------------------------------------------------------------
// PURPOSE:
// This library implements the File class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedFile } from '../serializers/File'

import { Tree } from '../utils/Tree'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { FileNotFoundError } from '../errors/Tree'

export class File implements Model {
    private path: string = ''

    // Path getter and setter.
    getPath(): string { return this.path }
    setPath(path: string) {
        Log.info('Setting path', path)
        if (!Tree.exists(path)) {
            throw new FileNotFoundError(`Path not exists: ${path}`)
        }
        this.path = path
    }

    // String serializers.
    public toString(): string {
        return `<${(this as any).constructor.name}: ${this.getPath()}>`
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
        return new Promise((resolve, reject) => resolve())
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedFile {
        return {
            "Type": (this as any).constructor.name,
            "Path": this.getPath(),
        }
    }
    public deserialise(data: SerializedFile): void {
        if (data) {
            Log.info('Unserialising File', data)
            this.setPath(data.Path)
        }
    }
}
