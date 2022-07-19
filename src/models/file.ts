// ----------------------------------------------------------------
// Purpose:
// This library implements the File class.
// ----------------------------------------------------------------

import * as fs from 'fs'

import { SerializedFile } from '../serializers/file'

import { Model } from './base'

export class File implements Model {
    private path: string

    // Lazy constructor.
    constructor() {
        this.path = ''
    }

    // Path getter and setter.
    getPath() : string { return this.path }
    setPath(path: string) {
        if (!fs.existsSync(path))
            throw Error(`Path not exists: {path}`)
        this.path = path
    }

    // String serializers.
    toString() : string {
        return `<{(this as any).constructor.name}: {this.getPath()}>`
    }

    // JSON serializers.
    toJson() : SerializedFile {
        return {
            "Type": (this as any).constructor.name,
            "Path": this.getPath(),
        }
    }
    fromJson(data: SerializedFile) : void {
        this.setPath(data['Path'])
    }
}
