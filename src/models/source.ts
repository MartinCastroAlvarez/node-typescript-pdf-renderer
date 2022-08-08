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

import { InvalidTitleError } from '../errors/source'

export class Source implements Model {
    private title: Text = new Text()
    public authors: Array<Person> = new Array<Person>()
    public readonly avatar: Image = new Image()

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // JSON serializers.
    serialize(): SerializedSource {
        return {
            "Type": (this as any).constructor.name,
            "Authors": this.authors?.map(person => person.serialize()),
            "Title": this.title.serialize(),
            "Avatar": this.avatar.serialize(),
        }
    }
    unserialize(data: SerializedSource): void {
        if (data) {
            Log.info('Loading Source', data)
            this.avatar.unserialize(data['Avatar'])
            this.title.unserialize(data['Title'])
            this.authors = data['Authors']?.map(data => {
                let person: Person = new Person()
                person.unserialize(data)
                return person
            })
        }
    }
}
