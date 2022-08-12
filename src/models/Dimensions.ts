// ----------------------------------------------------------------
// Purpose:
// This library implements the Dimensions class.
// ----------------------------------------------------------------

import { SerializedDimensions } from '../serializers/Dimensions'

import { Model } from '../interfaces/Model'

import { Log } from '../utils/Logging'

export class Dimensions implements Model {
    private normal: number = 8
    private small: number = 6
    private title: number = 16
    private subtitle: number = 12
    private margin: number = 40
    private break: number = 4

    // Margin size getter and setter.
    getMargin(): number { return this.margin }
    setMargin(size: number) { this.margin = size }

    // Break size getter and setter.
    getBreak(): number { return this.break }
    setBreak(size: number) { this.break = size }

    // Normal size getter and setter.
    getNormal(): number { return this.normal }
    setNormal(size: number) { this.normal = size }

    // Small size getter and setter.
    getSmall(): number { return this.small }
    setSmall(size: number) { this.small = size }

    // Title size getter and setter.
    getTitle(): number { return this.title }
    setTitle(size: number) { this.title = size }

    // Subtitle size getter and setter.
    getSubtitle(): number { return this.subtitle }
    setSubtitle(size: number) { this.subtitle = size }

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.getNormal()}>`
    }

    // JSON serializers.
    serialize(): SerializedDimensions {
        return {
            "Type": (this as any).constructor.name,
            "Normal": this.getNormal(),
            "Small": this.getSmall(),
            "Margin": this.getMargin(),
            "Break": this.getBreak(),
            "Title": this.getTitle(),
            "Subtitle": this.getSubtitle(),
        }
    }
    unserialize(data: SerializedDimensions): void {
        if (data) {
            Log.info('Loading Dimensions', data)
            this.setNormal(data['Normal'])
            this.setSmall(data['Small'])
            this.setMargin(data['Margin'])
            this.setBreak(data['Break'])
            this.setTitle(data['Title'])
            this.setSubtitle(data['Subtitle'])
        }
    }
}
