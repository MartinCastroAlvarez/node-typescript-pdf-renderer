// ----------------------------------------------------------------
// Purpose:
// This library defines the Image class.
//
// Reference:
// https://blog.logrocket.com/processing-images-sharp-node-js/
// ----------------------------------------------------------------

const sharp = require('sharp')

import { Tree } from './Tree'
import { Hash } from './Hash'
import { Log } from './Logging'

import { ImageProcessingError, ImageNotFoundError } from '../errors/Image'

export abstract class ImageProcessor {
    public static async toGrey(path: string) {
        Log.info("Converting image to Grey", path)
        if (!Tree.exists(path))
            throw new ImageNotFoundError("Image not found!")
        const cache: string = Tree.join(Tree.cache, Hash.digest('GREY' + path))
        if (!Tree.exists(cache))
            await sharp(path).grayscale()
                .toFile(cache, ImageProcessor.onComplete)
        Log.info("Image converted to grey", path, cache)
        return cache
    }

    public static async toRed(path: string) {
        Log.info("Converting image to red", path)
        if (!Tree.exists(path))
            throw new ImageNotFoundError("Image not found!")
        const cache: string = Tree.join(Tree.cache, Hash.digest('RED' + path))
        if (!Tree.exists(cache))
            await sharp(path).tint({r: 255, g: 0, b: 0})
                .toFile(cache, ImageProcessor.onComplete)
        Log.info("Image converted to red", path, cache)
        return cache
    }

    public static async toBlue(path: string) {
        Log.info("Converting image to blue", path)
        if (!Tree.exists(path))
            throw new ImageNotFoundError("Image not found!")
        const cache: string = Tree.join(Tree.cache, Hash.digest('BLUE' + path))
        if (!Tree.exists(cache))
            await sharp(path).tint({r: 0, g: 0, b: 255})
                .toFile(cache, ImageProcessor.onComplete)
        Log.info("Image converted to blue", path, cache)
        return cache
    }

    public static async toGreen(path: string) {
        Log.info("Converting image to green", path)
        if (!Tree.exists(path))
            throw new ImageNotFoundError("Image not found!")
        const cache: string = Tree.join(Tree.cache, Hash.digest('GREEN' + path))
        if (!Tree.exists(cache))
            await sharp(path).tint({r: 0, g: 255, b: 0})
                .toFile(cache, ImageProcessor.onComplete)
        Log.info("Image converted to green", path, cache)
        return cache
    }

    public static async toBlur(path: string) {
        Log.info("Converting image to blurred", path)
        if (!Tree.exists(path))
            throw new ImageNotFoundError("Image not found!")
        const cache: string = Tree.join(Tree.cache, Hash.digest('BLUR' + path))
        if (!Tree.exists(cache))
            await sharp(path).blur(9)
                .toFile(cache, ImageProcessor.onComplete)
        Log.info("Image converted to blur", path, cache)
        return cache
    }

    public static onComplete(err: any, info: any) {
        Log.info("Finished processing image", info, err)
        if (err)
            throw new ImageProcessingError("Failed to process image")
    }
}
