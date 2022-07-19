// ----------------------------------------------------------------
// Purpose:
// This class implements the YAML reader.
// ----------------------------------------------------------------

import readYamlFile from 'read-yaml-file'

import { Model, Serializable } from './models/base'

import { Author } from './models/author'
import { Brand } from './models/brand'
import { Book } from './models/book'
import { Chapter } from './models/chapter'
import { Definition } from './models/definition'
import { List } from './models/list'
import { Proverb } from './models/proverb'
import { Quote } from './models/quote'
import { Story } from './models/story'
import { Text } from './models/text'

export class Reader {

    match(data: Serializable): Model {
        throw new Error(data.type)
        return new Text()
    }

}
