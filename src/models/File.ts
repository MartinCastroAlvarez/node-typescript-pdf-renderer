// ----------------------------------------------------------------
// Purpose:
// This library implements the File class.
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
        if (!Tree.exists(path))
            throw new FileNotFoundError(`Path not exists: ${path}`)
        this.path = path
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getPath()}>`
    }

    // JSON serializers.
    serialize(): SerializedFile {
        return {
            "Type": (this as any).constructor.name,
            "Path": this.getPath(),
        }
    }
    unserialize(data: SerializedFile): void {
        if (data) {
            Log.info('Loading File', data)
            this.setPath(data['Path'])
        }
    }
}
