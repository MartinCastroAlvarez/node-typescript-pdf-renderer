// ----------------------------------------------------------------
// Purpose:
// This class implements the Reference class.
// ----------------------------------------------------------------

import { Yaml } from './yaml'
import { Tree } from './tree'

export enum References {
    FONTS = '@fonts'
    IMAGES = '@images'
    BOOKS = '@books'
    CONFIG = '@config'
}

export class Reference {
    private text: string

    constructor() {
        this.text = ''
    }

    // Title getter and setter.
    getText(): string { return this.text }
    setText(text: string) { this.text = text }

    // Evaluates if the text is a reference.
    isReference(): boolean {
        if (typeof this.getText() === 'string' || this.getText() instanceof String) {
            if (this.getText().startsWith(References.FONTS))
                return true
            if (this.getText().startsWith(References.IMAGES))
                return true
            if (this.getText().startsWith(References.BOOKS))
                return true
            if (this.getText().startsWith(References.CONFIG))
                return true
        }
        return false
    }

    // Generates the full path of a reference.
    getPath(): string {
        console.log(`Dereferencing: ${this.getText()}`)
        let tree: Tree = new Tree()
        let path: string = this.getText()
        path.replace(References.FONTS, tree.fonts)
        path.replace(References.CONFIG, tree.config)
        path.replace(References.IMAGES, tree.images)
        path.replace(References.BOOKS, tree.books)
        return path
    }
}
