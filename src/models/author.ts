// ----------------------------------------------------------------
// Purpose:
// This library implements the Author class.
// ----------------------------------------------------------------

import { Content } from './content'
import { Text } from './text'

export class Author {
    public name: string
    public website: string
    public email: string

    // Lazy constructor.
    constructor() {
        this.name = ''
        this.website = ''
        this.email = ''
    }
}
