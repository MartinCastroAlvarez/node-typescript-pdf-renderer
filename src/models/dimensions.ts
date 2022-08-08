// ----------------------------------------------------------------
// Purpose:
// This library implements the Dimensions class.
// ----------------------------------------------------------------

import { SerializedDimensions } from '../serializers/dimensions'

import { Model } from '../interfaces/model'

import { Log } from '../logging'

export class Dimensions implements Model {
    private normal: number = 8
    private title: number = 16
    private subtitle: number = 12
    private margin: number = 40

    // Margin font getter and setter.
    getMargin(): number { return this.margin }
    setMargin(size: number) { this.margin = size }

    // Normal font getter and setter.
    getNormal(): number { return this.normal }
    setNormal(size: number) { this.normal = size }

    // Title font getter and setter.
    getTitle(): number { return this.title }
    setTitle(size: number) { this.title = size }

    // Subtitle font getter and setter.
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
            "Margin": this.getMargin(),
            "Title": this.getTitle(),
            "Subtitle": this.getSubtitle(),
        }
    }
    unserialize(data: SerializedDimensions): void {
        if (data) {
            Log.info('Loading Dimensions', data)
            this.setNormal(data['Normal'])
            this.setMargin(data['Margin'])
            this.setTitle(data['Title'])
            this.setSubtitle(data['Subtitle'])
        }
    }
}
