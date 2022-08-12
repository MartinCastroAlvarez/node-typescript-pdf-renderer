// ----------------------------------------------------------------
// Purpose:
// This library implements the Image class.
// ----------------------------------------------------------------

import { SerializedImage } from '../serializers/Image'

import { Model } from '../interfaces/Model'

import { Log } from '../Logging'

import { File } from './File'

import { InvalidImageBottomError, InvalidImageHeightError, InvalidImageLeftError, InvalidImageRightError, InvalidImageTopError, InvalidImageWidthError } from '../errors/Image'

export class Image extends File implements Model {
    private width: number = 100
    private height: number = 100
    private left: number = 0
    private right: number = 0
    private top: number = 0
    private bottom: number = 0

    // Width getter and setter.
    getWidth(): number { return this.width }
    setWidth(width: number) {
        if (width < 0 || width > 100)
            throw new InvalidImageWidthError(`Invalid width: {width}`)
        this.width = width
    }

    // Height getter and setter.
    getHeight(): number { return this.height }
    setHeight(height: number) {
        if (height < 0 || height > 100)
            throw new InvalidImageHeightError(`Invalid height: {height}`)
        this.height = height
    }

    // Top getter and setter.
    getTop(): number { return this.top }
    setTop(top: number) {
        if (top < 0 || top > 100)
            throw new InvalidImageTopError(`Invalid top: {top}`)
        this.top = top
    }

    // Bottom getter and setter.
    getBottom(): number { return this.bottom }
    setBottom(bottom: number) {
        if (bottom < 0 || bottom > 100)
            throw new InvalidImageBottomError(`Invalid bottom: {bottom}`)
        this.bottom = bottom
    }

    // Left getter and setter.
    getLeft(): number { return this.left }
    setLeft(left: number) {
        if (left < 0 || left > 100)
            throw new InvalidImageLeftError(`Invalid left: {left}`)
        this.left = left
    }

    // Right getter and setter.
    getRight(): number { return this.right }
    setRight(right: number) {
        if (right < 0 || right > 100)
            throw new InvalidImageRightError(`Invalid right: {right}`)
        this.right = right
    }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getPath()}>`
    }

    // JSON serializers.
    serialize(): SerializedImage {
        return {
            "Type": (this as any).constructor.name,
            "Path": this.getPath(),
            "Width": this.getWidth(),
            "Height": this.getHeight(),
            "Top": this.getTop(),
            "Bottom": this.getBottom(),
            "Left": this.getLeft(),
            "Right": this.getRight(),
        }
    }
    unserialize(data: SerializedImage): void {
        if (data) {
            Log.info('Loading Image', data)
            this.setPath(data['Path'])
            this.setWidth(data['Width'])
            this.setHeight(data['Height'])
            this.setTop(data['Top'])
            this.setBottom(data['Bottom'])
            this.setLeft(data['Left'])
            this.setRight(data['Right'])
        }
    }
}