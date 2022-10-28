// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Tree structure.
//
// REFERENCES:
// - https://nodejs.org/api/path.html
// ----------------------------------------------------------------

import * as fs from 'fs'

const pathLib = require('path')

import { Log } from './Logging'

import { DirectoryNotFoundError, FileNotFoundError } from '../errors/Tree'

const root: string = pathLib.dirname(pathLib.dirname(__dirname))

export abstract class Tree {
    public static readonly root: string = root
    public static readonly fonts: string = pathLib.join(root, 'fonts')
    public static readonly config: string = pathLib.join(root, 'config')
    public static readonly images: string = pathLib.join(root, 'images')
    public static readonly books: string = pathLib.join(root, 'books')
    public static readonly chapters: string = pathLib.join(root, 'chapters')
    public static readonly stories: string = pathLib.join(root, 'stories')
    public static readonly persons: string = pathLib.join(root, 'persons')
    public static readonly code: string = pathLib.join(root, 'code')
    public static readonly topics: string = pathLib.join(root, 'topics')
    public static readonly files: string = pathLib.join(root, 'files')
    public static readonly builds: string = pathLib.join(root, 'builds')
    public static readonly i18n: string = pathLib.join(root, 'i18n')
    public static readonly legal: string = pathLib.join(root, 'legal')
    public static readonly cache: string = pathLib.join(root, '.cache')

    // ----------------------------------------------------------------
    // Join path strings.
    // ----------------------------------------------------------------
    public static join(...names: Array<string>): string {
        Log.info('Joining path', names)
        return pathLib.join(...names)
    }

    // ----------------------------------------------------------------
    // Evaluates if a file exists.
    // ----------------------------------------------------------------
    public static exists(path: string): boolean {
        Log.info('Checking if exists', path)
        return fs.existsSync(path)
    }

    // ----------------------------------------------------------------
    // Read file from path.
    // ----------------------------------------------------------------
    public static read(path: string): any {
        Log.info('Reading file', path)
        if (!Tree.exists(path)) {
            throw new FileNotFoundError(`File does not exist: ${path}`)
        }
        return fs.readFileSync(path, 'utf8')
    }

    // ----------------------------------------------------------------
    // List files in directory.
    // ----------------------------------------------------------------
    public static list(path: string): Array<string> {
        Log.info('Listing files in', path)
        if (!Tree.exists(path)) {
            throw new DirectoryNotFoundError(`File does not exist: ${path}`)
        }
        return fs.readdirSync(path)
    }

    // ----------------------------------------------------------------
    // Creating a directory structure.
    // ----------------------------------------------------------------
    public static create(path: string): void {
        Log.info('Creating directory', path)
        fs.mkdirSync(path, {
            recursive: true,
        })
    }

    // ----------------------------------------------------------------
    // Cleaning a directory recurisvely.
    // ----------------------------------------------------------------
    public static clean(path: string): void {
        Log.info('Cleaning directory', path)
        for (const file of Tree.list(path)) {
            fs.unlinkSync(Tree.join(path, file))
        }
    }

    // ----------------------------------------------------------------
    // Creating a write stream to a file.
    // ----------------------------------------------------------------
    public static stream(path: string): object {
        Log.info('Writing to', path)
        return fs.createWriteStream(path)
    }
}

if (!Tree.exists(Tree.cache)) {
    Tree.create(Tree.cache)
}
if (!Tree.exists(Tree.builds)) {
    Tree.create(Tree.builds)
}
