// ----------------------------------------------------------------
// Purpose:
// This class implements the Tree structure.
// ----------------------------------------------------------------

import * as fs from 'fs'
const path = require('path')

export class Tree {
    public readonly root: string
    public readonly fonts: string
    public readonly images: string
    public readonly books: string

    constructor() {
        this.root = path.dirname(__dirname)
        this.fonts = path.join(this.root, 'fonts')
        this.config = path.join(this.root, 'config')
        this.images = path.join(this.root, 'images')
        this.books = path.join(this.root, 'books')
    }

    // Join path strings.
    join(root: string, path: string): string {
        return path.join(root, path)
    }

    // Evaluates if a file exists.
    exists(path: string): boolean {
        return fs.existsSync(path)
    }

    // Read file from path.
    read(path: string) {
        if (!this.exists(path))
            throw Error(`File does not exist: ${path}`)
        return fs.readFileSync(path, 'utf8')
    }

    // List files in directory.
    list(path: string) {
        if (!this.exists(path))
            throw Error(`File does not exist: ${path}`)
        return fs.readdirSync(path)
    }
}
