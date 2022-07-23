// ----------------------------------------------------------------
// Purpose:
// This class implements the Tree structure.
// ----------------------------------------------------------------

import * as fs from 'fs'
const path = require('path')

class FileNotFoundError extends Error {}
class DirectoryNotFoundError extends Error {}

export class Tree {
    public readonly root: string
    public readonly fonts: string
    public readonly images: string
    public readonly config: string
    public readonly books: string
    public readonly persons: string
    public readonly files: string
    public readonly topics: string

    constructor() {
        this.root = path.dirname(__dirname)
        this.fonts = path.join(this.root, 'fonts')
        this.config = path.join(this.root, 'config')
        this.images = path.join(this.root, 'images')
        this.books = path.join(this.root, 'books')
        this.persons = path.join(this.root, 'persons')
        this.topics = path.join(this.root, 'topics')
        this.files = path.join(this.root, 'files')
    }

    // Join path strings.
    join(directory: string, name: string): string {
        return this.join(directory, name)
    }

    // Evaluates if a file exists.
    exists(path: string): boolean {
        return fs.existsSync(path)
    }

    // Read file from path.
    read(path: string) {
        console.log(`Reading file: ${path}`)
        if (!this.exists(path))
            throw new FileNotFoundError(`File does not exist: ${path}`)
        return fs.readFileSync(path, 'utf8')
    }

    // List files in directory.
    list(path: string) {
        console.log(`Listing files in: ${path}`)
        if (!this.exists(path))
            throw new DirectoryNotFoundError(`File does not exist: ${path}`)
        return fs.readdirSync(path)
    }
}
