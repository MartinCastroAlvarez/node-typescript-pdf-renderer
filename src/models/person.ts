// ----------------------------------------------------------------
// Purpose:
// This library implements the Person class.
// ----------------------------------------------------------------

import { SerializedPerson } from '../serializers/person'

import { Model } from '../interfaces/model'

import { Image } from './image'
import { Text } from './text'

class InvalidPersonTitleError extends Error {}

export class Person implements Model {
    private name: string
    private website: string
    private email: string
    public readonly logo: Image

    // Lazy constructor.
    constructor() {
        this.name = ''
        this.website = ''
        this.email = ''
        this.logo = new Image()
    }

    // Name getter and setter.
    getName(): string { return this.name }
    setName(name: string) {
        if (!name || name.length > 50)
            throw new InvalidPersonTitleError(`Invalid person name: ${name}`)
        this.name = name
    }

    // Website getter and setter.
    getWebsite(): string { return this.website }
    setWebsite(website: string) { this.website = website }

    // Email getter and setter.
    getEmail(): string { return this.email }
    setEmail(email: string) { this.email = email }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getName()}>`
    }

    // JSON serializers.
    serialize(): SerializedPerson {
        return {
            "Type": (this as any).constructor.name,
            "Name": this.getName(),
            "Website": this.getWebsite(),
            "Email": this.getEmail(),
            "Logo": this.logo.serialize(),
        }
    }
    unserialize(data: SerializedPerson): void {
        if (data) {
            console.log(`Loading ${data.Type}: ${JSON.stringify(data)}`)
            this.setName(data['Name'])
            this.setWebsite(data['Website'])
            this.setEmail(data['Email'])
            this.logo.unserialize(data['Logo'])
        }
    }
}
