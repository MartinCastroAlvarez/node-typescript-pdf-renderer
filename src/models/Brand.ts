// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand class.
// ----------------------------------------------------------------

import { SerializedBrand } from '../serializers/Brand'

import { Model } from '../interfaces/Model'

import { Log } from '../Logging'

import { Image } from './Image'
import { Person } from './Person'

export class Brand implements Model {
    private title: string = ''
    public readonly avatar: Image = new Image()
    public authors: Array<Person> = new Array<Person>()

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) { this.title = title }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getTitle()}>`
    }

    // JSON serializers.
    serialize(): SerializedBrand {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.getTitle(),
            "Authors": this.authors?.map(person => person.serialize()),
            "Avatar": this.avatar.serialize(),
        }
    }
    unserialize(data: SerializedBrand): void {
        if (data) {
            Log.info('Loading Brand', data)
            this.setTitle(data['Title'])
            this.avatar.unserialize(data['Avatar'])
            this.authors = data['Authors']?.map(data => {
                let person = new Person()
                person.unserialize(data)
                return person
            })
        }
    }
}
