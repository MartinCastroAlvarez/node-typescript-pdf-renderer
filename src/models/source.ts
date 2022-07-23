// ----------------------------------------------------------------
// Purpose:
// This library implements the Source class.
// ----------------------------------------------------------------

import { SerializedSource } from '../serializers/source'

import { Model } from '../interfaces/model'

import { Log } from '../logging'

import { Person } from './person'
import { Image } from './image'
import { Text } from './text'

class InvalidTitleError extends Error {}

export class Source implements Model {
    private title: string
    public authors: Array<Person>
    public readonly logo: Image

    // Lazy constructor.
    constructor() {
        this.title = ''
        this.authors = new Array<Person>()
        this.logo = new Image()
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) {
        if (!title || title.length > 30)
            throw new InvalidTitleError(`Invalid title name: {title}`)
        this.title = title
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getTitle()}>`
    }

    // JSON serializers.
    serialize(): SerializedSource {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.getTitle(),
            "Authors": this.authors?.map(person => person.serialize()),
            "Logo": this.logo.serialize(),
        }
    }
    unserialize(data: SerializedSource): void {
        if (data) {
            Log.info('Loading Source', data)
            this.setTitle(data['Title'])
            this.authors = data['Authors']?.map(data => {
                let person: Person = new Person()
                person.unserialize(data)
                return person
            })
            this.logo.unserialize(data['Logo'])
        }
    }
}
