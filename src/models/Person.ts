// ----------------------------------------------------------------
// Purpose:
// This library implements the Person class.
// ----------------------------------------------------------------

import { SerializedPerson } from '../serializers/Person'

import { Model } from '../interfaces/Model'

import { Log } from '../Logging'

import { Image } from './Image'
import { Text } from './Text'


export class Person implements Model {
    public readonly name: Text = new Text()
    public readonly website: Text = new Text()
    public readonly bio: Text = new Text()
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
            "Bio": this.bio.serialize(),
            "Email": this.email.serialize(),
            "Avatar": this.avatar.serialize(),
        }
    }
    unserialize(data: SerializedPerson): void {
        if (data) {
            Log.info('Loading Person', data)
            this.name.unserialize(data['Name'])
            this.website.unserialize(data['Website'])
            this.bio.unserialize(data['Bio'])
            this.email.unserialize(data['Email'])
            this.avatar.unserialize(data['Avatar'])
        }
    }
}
