// ----------------------------------------------------------------
// Purpose:
// This library implements the Person class.
// ----------------------------------------------------------------

import { SerializedPerson } from '../serializers/person'

import { Model } from '../interfaces/model'

import { Log } from '../logging'

import { Image } from './image'
import { Text } from './text'

import { InvalidPersonTitleError } from '../errors/person'

export class Person implements Model {
    public readonly name: Text = new Text()
    public readonly website: Text = new Text()
    public readonly email: Text = new Text()
    public readonly avatar: Image = new Image()

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.name.get()}>`
    }

    // JSON serializers.
    serialize(): SerializedPerson {
        return {
            "Type": (this as any).constructor.name,
            "Name": this.name.serialize(),
            "Website": this.website.serialize(),
            "Email": this.email.serialize(),
            "Avatar": this.avatar.serialize(),
        }
    }
    unserialize(data: SerializedPerson): void {
        if (data) {
            Log.info('Loading Person', data)
            this.name.unserialize(data['Name'])
            this.website.unserialize(data['Website'])
            this.email.unserialize(data['Email'])
            this.avatar.unserialize(data['Avatar'])
        }
    }
}
