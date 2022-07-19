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
        this.root = path.basename(__dirname)
        this.fonts = path.join(this.root, 'fonts')
        this.images = path.join(this.root, 'images')
        this.books = path.join(this.root, 'books')
    }

    getImagePath(name: string): string {
        let fullPath: string = path.join(this.images, name)
        if (!fs.existsSync(fullPath))
            throw Error(`File does not exist: ${fullPath}`)
        return fullPath
    }

    getFontPath(name: string): string {
        let fullPath: string = path.join(this.fonts, name)
        if (!fs.existsSync(fullPath))
            throw Error(`File does not exist: ${fullPath}`)
        return fullPath
    }

    getBookPath(name: string): string {
        let fullPath: string = path.join(this.books, name)
        if (!fs.existsSync(fullPath))
            throw Error(`File does not exist: ${fullPath}`)
        return fullPath
    }

    getFiles(path: string) {
        return fs.readdirSync(path)
    }
}
