// ----------------------------------------------------------------
// Purpose:
// This class implements the Tree structure.
// ----------------------------------------------------------------

import * as fs from 'fs'
const path = require('path')

class FileNotFoundError extends Error {}
class DirectoryNotFoundError extends Error {}

const root: string = path.dirname(__dirname)

export class Tree {
    public static readonly root: string = root
    public static readonly fonts: string = path.join(root, 'fonts')
    public static readonly config: string = path.join(root, 'config')
    public static readonly images: string = path.join(root, 'images')
    public static readonly books: string = path.join(root, 'books')
    public static readonly persons: string = path.join(root, 'persons')
    public static readonly topics: string = path.join(root, 'topics')
    public static readonly files: string = path.join(root, 'files')
    public static readonly builds: string = path.join(root, 'builds')

    // Join path strings.
    public static join(directory: string, name: string): string {
        return path.join(directory, name)
    }

    // Evaluates if a file exists.
    public static exists(path: string): boolean {
        return fs.existsSync(path)
    }

    // Read file from path.
    public static read(path: string) {
        console.log(`Reading file: ${path}`)
        if (!Tree.exists(path))
            throw new FileNotFoundError(`File does not exist: ${path}`)
        return fs.readFileSync(path, 'utf8')
    }

    // List files in directory.
    public static list(path: string) {
        console.log(`Listing files in: ${path}`)
        if (!Tree.exists(path))
            throw new DirectoryNotFoundError(`File does not exist: ${path}`)
        return fs.readdirSync(path)
    }

    // Creating a write stream to a file.
    public static stream(path: string): object {
        return fs.createWriteStream(path)
    }
}
