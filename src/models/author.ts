// ----------------------------------------------------------------
// Purpose:
// This library implements the Author class.
// ----------------------------------------------------------------

import { Model } from './base'
import { Block } from './block'
import { Text } from './text'

export class Author implements Model {
    private name: string
    private website: string
    private email: string

    // Lazy constructor.
    constructor() {
        this.name = ''
        this.website = ''
        this.email = ''
    }

    // Name getter and setter.
    getName() : string { return this.name }
    setName(name: string) { this.name = name }

    // Website getter and setter.
    getWebsite() : string { return this.website }
    setWebsite(website: string) { this.website = website }

    // Email getter and setter.
    getEmail() : string { return this.email }
    setEmail(email: string) { this.email = email }
}
