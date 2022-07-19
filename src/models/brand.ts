// ----------------------------------------------------------------
// Purpose:
// This library implements the Brand class.
// ----------------------------------------------------------------

import { SerializedBrand} from '../serializers/brand'

import { Model } from './base'
import { Image } from './image'

export class Brand implements Model {
    private title: string
    public readonly logo: Image

    // Lazy constructor.
    constructor() {
        this.title = ''
        this.logo = new Image()
    }

    // Title getter and setter.
    getTitle(): string { return this.title }
    setTitle(title: string) { this.title = title }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getTitle()}>`
    }

    // JSON serializers.
    toJson(): SerializedBrand {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.getTitle(),
            "Logo": this.logo.toJson(),
        }
    }
    fromJson(data: SerializedBrand): void {
        this.setTitle(data['Title'])
        this.logo.fromJson(data['Logo'])
    }
}
