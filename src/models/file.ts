// ----------------------------------------------------------------
// Purpose:
// This library implements the File class.
// ----------------------------------------------------------------

import { SerializedFile } from '../serializers/file'

import { Tree } from '../tree'

import { Model } from './base'

export class File implements Model {
    private path: string

    // Lazy constructor.
    constructor() {
        this.path = ''
    }

    // Path getter and setter.
    getPath(): string { return this.path }
    setPath(path: string) {
        let tree: Tree = new Tree()
        if (!tree.exists(path))
            throw Error(`Path not exists: {path}`)
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
        console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
        if (data) {
            this.setPath(data['Path'])
        }
    }
}
