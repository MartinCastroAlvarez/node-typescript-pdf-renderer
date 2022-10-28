// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Code class.
//
// Models:
// This directory contiains the model of the data of this application.
// ----------------------------------------------------------------

import { SerializedCode } from '../serializers/Code'

import { Syntax } from '../enums/Syntax'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

import { Text } from './Text'

import { InvalidSyntaxError } from '../errors/Code'

export class Code implements Model {
    private syntax: Syntax = Syntax.NODE
    public readonly code: Text = new Text()

    // Orientation getter and setter.
    public getSyntax(): Syntax {
        return this.syntax
    }
    public setSyntax(syntax: Syntax) {
        if (!syntax) {
            throw new InvalidSyntaxError(`Invalid code syntax: ${syntax}`)
        }
        this.syntax = syntax
    }
    public isPython(): boolean { return this.getSyntax() === Syntax.PYTHON }
    public isNode(): boolean { return this.getSyntax() === Syntax.NODE }

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
        Log.info('Preprocessing Code', this)
        return new Promise((resolve, reject) => resolve())
    }

    // ----------------------------------------------------------------
    // JSON SERIALIZERS:
    // The main purpose is to save the state of an object in order to
    // be able to recreate it when needed. The reverse process is called
    // deserialization
    // ----------------------------------------------------------------
    public serialise(): SerializedCode {
        return {
            "Type": (this as any).constructor.name,
            "Syntax": this.getSyntax(),
            "Code": this.code.serialise(),
        }
    }
    public deserialise(data: SerializedCode): void {
        if (data) {
            Log.info('Unserialising Code', data)
            this.code.deserialise(data.Code)
            data.Syntax = data.Syntax ? data.Syntax : Syntax.PYTHON
            this.setSyntax(Syntax[data.Syntax.toUpperCase()])
        }
    }
}
