// ----------------------------------------------------------------
// Purpose:
// This library implements the Author class.
// ----------------------------------------------------------------

import { SerializedAuthor } from '../serializers/author'

import { Model } from './base'
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

    // String serializers.
    toString() : string {
        return `<{(this as any).constructor.name}: {this.getName()}>`
    }

    // JSON serializers.
    toJson() : SerializedAuthor {
        return {
            "type": (this as any).constructor.name,
            "name": this.getName(),
            "website": this.getWebsite(),
            "email": this.getEmail(),
        }
    }
    fromJson(data: SerializedAuthor) : void {
        this.setName(data.name)
        this.setWebsite(data.website)
        this.setEmail(data.email)
    }
}
