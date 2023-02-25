// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Editor class.
//
// Reference:
// https://blog.logrocket.com/processing-images-sharp-node-js/
// ----------------------------------------------------------------

const sharp = require('sharp')
const sizeOf = require('image-size')

import { FileSystemCache } from './Cache'
import { Log } from './Logging'
import { Tree } from './Tree'

import {
    ImageIntensityError,
    ImageLevelError,
    ImageNotFoundError,
    ImageProcessingError,
    ImageRatioError,
    InvalidImageHeightError,
    InvalidImageLeftError,
    InvalidImageTopError,
    InvalidImageWidthError
} from '../errors/Image'

interface GreyscaleConfig {
    path: string
}

interface LevelsConfig {
    path: string
    red?: number
    green?: number
    blue?: number
}

interface AspectRatioConfig {
    path: string
    ratio?: number
}

interface CropConfig {
    path: string
    left?: number
    top?: number
    width?: number
    height?: number
}

interface BlurConfig {
    path: string
    intensity?: number
}

export abstract class Editor {
    // ----------------------------------------------------------------
    // PURPOSE:
    // Transforming an image to greyscale.
    // ----------------------------------------------------------------
    public static greyscale(config: GreyscaleConfig): Promise<string> {
        Log.info("Converting image to Grey", config)
        if (!Tree.exists(config.path)) {
            throw new ImageNotFoundError("Image not found!")
        }
        const cache: FileSystemCache = new FileSystemCache(['rgb', config.path ])
        return new Promise((resolve, reject) => {
            if (!cache.isCached()) {
                sharp(config.path)
                    .grayscale()
                    .toFile(cache.getKey(), (err, info) => {
                        Log.info("Finished processing image", info, err)
                        if (err) {
                            throw new ImageProcessingError("Failed to process image")
                        }
                        Log.info("Image converted to grey", config, cache)
                        resolve(cache.getKey())
                    })
            } else {
                Log.info("Image converted to grey", config, cache)
                resolve(cache.getKey())
            }
        })
    }

    // ----------------------------------------------------------------
    // PURPOSE:
    // Transforming an image RGB levels.
    // ----------------------------------------------------------------
    public static levels(config: LevelsConfig): Promise<string> {
        Log.info("Altering image levels", config)
        if (!Tree.exists(config.path)) {
            throw new ImageNotFoundError("Image not found!")
        }
        if (config.red < 0) {
            throw new ImageLevelError("The red level can not be negative!")
        }
        if (config.green < 0) {
            throw new ImageLevelError("The green level can not be negative!")
        }
        if (config.blue < 0) {
            throw new ImageLevelError("The blue level can not be negative!")
        }
        if (config.red > 255) {
            throw new ImageLevelError("The red level is too large!")
        }
        if (config.green > 255) {
            throw new ImageLevelError("The green level is too large!")
        }
        if (config.blue > 25) {
            throw new ImageLevelError("The blue level is too large!")
        }
        const cache: FileSystemCache = new FileSystemCache([
            'rgb', config.path, config.red, config.green, config.blue
        ])
        return new Promise((resolve, reject) => {
            if (!cache.isCached()) {
                sharp(config.path)
                    .tint({
                        r: config.red || 0,
                        g: config.green || 0,
                        b: config.blue || 0
                    })
                    .toFile(cache.getKey(), (err, info) => {
                        Log.info("Finished processing image", info, err)
                        if (err) {
                            throw new ImageProcessingError("Failed to process image")
                        }
                        Log.info("Image levels altered", config, cache)
                        resolve(cache.getKey())
                    })
            } else {
                Log.info("Image levels altered", config, cache)
                resolve(cache.getKey())
            }
        })
    }

    // ----------------------------------------------------------------
    // PURPOSE:
    // Cropping the image so that the proportion is kept.
    // ----------------------------------------------------------------
    public static ratio(config: AspectRatioConfig): Promise<string> {
        Log.info("Adjusting aspecting ratio", config)
        if (!Tree.exists(config.path)) {
            throw new ImageNotFoundError("Image not found!")
        }
        if (config.ratio <= 0) {
            throw new ImageRatioError("The ratio can not be negative!")
        }
        if (config.ratio > 5) {
            throw new ImageRatioError("The ratio is too large!")
        }
        const dimensions = sizeOf(config.path)
        let width = dimensions.width
        let height = dimensions.height
        Log.info("Current dimensions", config.ratio, width, height)
        if (config.ratio == 1) {
            if (width > height) {
                width = height
            } else {
                height = width
            }
        } if (config.ratio >= 1) {
            height = width / config.ratio
            if (height > dimensions.height) {
                throw new Error('1234')
                height = dimensions.width
                width = height * config.ratio
            }
        } else {
            width = height * config.ratio
            if (width > dimensions.width) {
                width = dimensions.width
                height = width / config.ratio
            }
        }
        Log.info("New dimensions", config.ratio, width, height)
        return Editor.crop({
            path: config.path,
            left: Math.floor(dimensions.width / 2 - width / 2),
            top: Math.floor(dimensions.height / 2 - height / 2),
            width: Math.floor(width),
            height: Math.floor(height),
        })
    }

    // ----------------------------------------------------------------
    // PURPOSE:
    // Cropping an image.
    // ----------------------------------------------------------------
    public static crop(config: CropConfig): Promise<string> {
        Log.info("Cropping an image", config.path)
        if (!Tree.exists(config.path)) {
            throw new ImageNotFoundError("Image not found!")
        }
        const dimensions = sizeOf(config.path)
        Log.info("Image new width", config.left, config.width)
        Log.info("Image new height ", config.top, config.height)
        Log.info("Current dimensions", dimensions.width, dimensions.height)
        if (config.width <= 0) {
            throw new InvalidImageWidthError("The new width can not be negative: " + config.width.toString())
        }
        if (config.height <= 0) {
            throw new InvalidImageHeightError("The new height can not be negative: " + config.height.toString())
        }
        if (config.left < 0) {
            throw new InvalidImageLeftError("The x-coordinate can not be negative: " + config.left.toString())
        }
        if (config.top < 0) {
            throw new InvalidImageTopError("The y-coordinate can not be negative: " + config.top.toString())
        }
        if (config.left + config.width > dimensions.width) {
            throw new InvalidImageWidthError("The new width is too high!")
        }
        if (config.top + config.height > dimensions.height) {
            throw new InvalidImageHeightError("The new height is too large!")
        }
        const cache: FileSystemCache = new FileSystemCache([
            'crop', config.path, config.left, config.top, config.width, config.height,
        ])
        return new Promise((resolve, reject) => {
            if (!cache.isCached()) {
                sharp(config.path)
                    .rotate()
                    .extract({
                        left: Math.floor(config.left),
                        top: Math.floor(config.top),
                        width: Math.floor(config.width),
                        height: Math.floor(config.height),
                    })
                    .resize(config.width, config.height)
                    .toFile(cache.getKey(), (err, info) => {
                        Log.info("Finished processing image", info, err)
                        if (err) {
                            throw new ImageProcessingError("Failed to process image")
                        }
                        Log.info("Image cropped", config.path, cache)
                        resolve(cache.getKey())
                    })
            } else {
                Log.info("Image cropped", config.path, cache)
                resolve(cache.getKey())
            }
        })
    }

    // ----------------------------------------------------------------
    // PURPOSE:
    // Blurring an image.
    // ----------------------------------------------------------------
    public static blur(config: BlurConfig): Promise<string> {
        Log.info("Converting image to blurred", config.path)
        if (!Tree.exists(config.path)) {
            throw new ImageNotFoundError("Image not found!")
        }
        if (config.intensity < 0) {
            throw new ImageIntensityError("The blur intensity can not be negative!")
        }
        if (config.intensity > 100) {
            throw new ImageIntensityError("The blur intensity is too large!")
        }
        const cache: FileSystemCache = new FileSystemCache([
            'blur', config.path, config.intensity,
        ])
        return new Promise((resolve, reject) => {
            if (!cache.isCached()) {
                sharp(config.path)
                    .blur(config.intensity)
                    .toFile(cache.getKey(), (err, info) => {
                        Log.info("Finished processing image", info, err)
                        if (err) {
                            throw new ImageProcessingError("Failed to process image")
                        }
                        Log.info("Image blurred", config.path, cache)
                        resolve(cache.getKey())
                    })
            } else {
                Log.info("Image blurred", config.path, cache)
                resolve(cache.getKey())
            }
        })
    }
}
