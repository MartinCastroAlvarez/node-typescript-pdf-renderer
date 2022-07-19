// ----------------------------------------------------------------
// Purpose:
// This library implements the Author class.
// ----------------------------------------------------------------

import { Model } from './base'
import { Block } from './block'
import { Text } from './text'

type SerializedAuthor = {
    type?: string
    name?: string
    website?: string
    email?: string
}

export class Author implements Model {
    public readonly TYPE: string = 'Author'

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

    // String serializers.
    toString() : string {
        return `<{this.TYPE}: {this.getName()}>`
    }

    // JSON serializers.
    toJson() : Map<string, string> {
        let serialized: SerializedAuthor = {
            "type": this.TYPE,
            "name": this.getName(),
            "website": this.getWebsite(),
            "email": this.getEmail(),
        }
        return <Map<string, string>>serialized
    }
    fromJson(data: Map<string, string>) : void {
        let serialized: SerializedAuthor = <SerializedAuthor>data
        if (serialized.type !== this.TYPE)
            throw new Error(`Type missmatch: {serialized}`)
        this.setName(serialized.name)
        this.setWebsite(serialized.website)
        this.setEmail(serialized.email)
    }
}
