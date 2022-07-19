// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand class.
// ----------------------------------------------------------------

import { Model } from './base'

export class Brand implements Model {
    private title: string

    // Lazy constructor.
    constructor() {
        this.title = ''
    }

    // Titlegetter and setter.
    getTitle() : string { return this.title }
    setTitle(title: string) { this.title = title }
}
