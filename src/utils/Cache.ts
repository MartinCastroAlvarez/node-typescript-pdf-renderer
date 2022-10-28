// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Cache class.
// ----------------------------------------------------------------

import { Cache } from '../interfaces/Cache'

import { Hash } from '../utils/Hash'
import { Tree } from '../utils/Tree'

export class FileSystemCache implements Cache {
    private key: string = ''

    constructor(data: Array<any>) {
        this.key = Tree.join(Tree.cache, Hash.digest(data))
    }

    // Cache key getter.
    public getKey(): string { return this.key }

    // Evalutes if the data is cached.
    public isCached(): boolean { return Tree.exists(this.getKey()) }

    // Saving data to cache.
    public save(data: any): void { throw new Error('Not implemented!') }

    // Getting data from cache.
    public get(): any { return null }
}
