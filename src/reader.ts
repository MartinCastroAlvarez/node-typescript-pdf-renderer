// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader.
// ----------------------------------------------------------------

import readYamlFile from 'read-yaml-file'

import { Model, Serializable } from './models/base'

import { Book } from './models/book'
import { Author } from './models/author'
// import { Brand } from './models/brand'
// import { Chapter } from './models/chapter'
import { Story } from './models/story'
import { List } from './models/list'
import { Proverb } from './models/proverb'
import { Definition } from './models/definition'
import { Quote } from './models/quote'
import { Text } from './models/text'

export class Reader {

    match(data: Serializable): Model {
        throw new Error(data.type)
        return new Text()
    }

}
