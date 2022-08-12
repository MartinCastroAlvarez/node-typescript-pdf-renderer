// ----------------------------------------------------------------
// Purpose:
// This class implements the Tree structure.
// ----------------------------------------------------------------

import * as fs from 'fs'
const path = require('path')

import { Log } from './Logging'

import { DirectoryNotFoundError, FileNotFoundError } from '../errors/Tree'

const root: string = path.dirname(path.dirname(__dirname))

export abstract class Tree {
    public static readonly root: string = root
    public static readonly fonts: string = path.join(root, 'fonts')
    public static readonly config: string = path.join(root, 'config')
    public static readonly images: string = path.join(root, 'images')
    public static readonly books: string = path.join(root, 'books')
    public static readonly persons: string = path.join(root, 'persons')
    public static readonly topics: string = path.join(root, 'topics')
    public static readonly files: string = path.join(root, 'files')
    public static readonly builds: string = path.join(root, 'builds')
    public static readonly i18n: string = path.join(root, 'i18n')
    public static readonly cache: string = path.join(root, '.cache')

    // Join path strings.
    public static join(directory: string, name: string): string {
        Log.info('Joining path', directory, name)
        return path.join(directory, name)
    }

    // Evaluates if a file exists.
    public static exists(path: string): boolean {
        Log.info('Checking if exists', path)
        return fs.existsSync(path)
    }

    // Read file from path.
    public static read(path: string): any {
        Log.info('Reading file', path)
        if (!Tree.exists(path))
            throw new FileNotFoundError(`File does not exist: ${path}`)
        return fs.readFileSync(path, 'utf8')
    }

    // List files in directory.
    public static list(path: string): Array<string> {
        Log.info('Listing files in', path)
        if (!Tree.exists(path))
            throw new DirectoryNotFoundError(`File does not exist: ${path}`)
        return fs.readdirSync(path)
    }

    // Creating a directory structure.
    public static create(path: string): void {
        Log.info('Creating directory', path)
        fs.mkdirSync(path, {
            recursive: true,
        })
    }

    // Cleaning a directory recurisvely.
    public static clean(path: string): void {
        Log.info('Cleaning directory', path)
        for (const file of Tree.list(path)) {
            fs.unlinkSync(Tree.join(path, file))
        }
    }

    // Creating a write stream to a file.
    public static stream(path: string): object {
        Log.info('Writing to', path)
        return fs.createWriteStream(path)
    }
}

if (!Tree.exists(Tree.cache))
    Tree.create(Tree.cache)
if (!Tree.exists(Tree.builds))
    Tree.create(Tree.builds)
