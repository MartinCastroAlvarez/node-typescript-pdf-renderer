// ----------------------------------------------------------------
// Purpose:
// This library implements the Source class.
// ----------------------------------------------------------------

import { SerializedSource } from '../serializers/Source'

import { Model } from '../interfaces/Model'

import { Log } from '../Logging'

import { Image } from './Image'
import { Person } from './Person'
import { Text } from './Text'


export class Source implements Model {
    public readonly title: Text = new Text()
    public readonly link: Text = new Text()
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
            "Link": this.link.serialize(),
            "Avatar": this.avatar.serialize(),
        }
    }
    unserialize(data: SerializedSource): void {
        if (data) {
            Log.info('Loading Source', data)
            this.avatar.unserialize(data['Avatar'])
            this.title.unserialize(data['Title'])
            this.link.unserialize(data['Link'])
            this.authors = data['Authors']?.map(data => {
                let person: Person = new Person()
                person.unserialize(data)
                return person
            }) || []
        }
    }
}
