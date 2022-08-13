// ----------------------------------------------------------------
// Purpose:
// This class implements the Box adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Feature } from '../../interfaces/Feature'

import { Config } from '../../Config'
import { Log } from '../../utils/Logging'

import { PdfSection } from '../Section'

import { Break } from './Break'

import { WidthException, HeightException, PositionException } from '../../errors/Geometry'

export class Box implements Feature {
    private section: PdfSection = new PdfSection()
    private width: number = null
    private height: number = 0
    private x: number = null
    private y: number = null
    private innerPadding: number = 5 
    private outerPadding: number = 5
    private top: number = null

    public getInnerPadding(): number { return this.innerPadding }
    public setInnerPadding(value: number): void { this.innerPadding = value }
    public getInnerPaddingSize(): number { return this.getInnerPadding() * Config.dimensions.getBreak() }

    public getOuterPadding(): number { return this.outerPadding }
    public setOuterPadding(value: number): void { this.outerPadding = value }
    public getOuterPaddingSize(): number { return this.getOuterPaddingSize() * Config.dimensions.getBreak() }

    public getTotalPadding(): number { return this.getInnerPadding() + this.getOuterPadding() }

    public getVerticalPosition(): number {
        if (this.y === null)
            return this.getSection().getCurrentVerticalPosition() - this.getInnerPaddingSize()
        return this.y
    }
    public getInnerVerticalPosition(): number {
        return this.top + this.getInnerPaddingSize()
    }
    public setVerticalPosition(value: number): void {
        if (value > this.getSection().getHeight())
            throw new PositionException('Vertical position is outside the page!')
        if (value < 0)
            throw new PositionException('Vertical position can not be negative!')
        this.y = value
    }

    public getHorizontalPosition(): number {
        if (this.x === null)
            return 0
        return this.x
    }
    public getInnerHorizontalPosition(): number {
        return this.getSection().getMarginLeft()
    }
    public setHorizontalPosition(value: number): void {
        if (value > this.getSection().getWidth())
            throw new PositionException('Horizontal position is outside the page!')
        if (value < 0)
            throw new PositionException('Horizontal position can not be negative!')
        this.x = value
    }

    public getWidth(): number {
        if (this.width  === null)
            return this.getSection().getWidth()
        return this.width
    }
    public setWidth(value: number): void {
        if (value > this.getSection().getWidth())
            throw new WidthException('Width is larger than the page size!')
        if (value < 0)
            throw new WidthException('Width can not be negative!')
        this.width = value
    }

    public getHeight(): number {
        return this.height
    }
    public getRealHeight(): number {
        return this.getHeight() + 2 * this.getInnerPaddingSize()
    }
    public setHeight(value: number): void {
        if (value > this.getSection().getWidth())
            throw new HeightException('Height is larger than the page size!')
        if (value < 0)
            throw new HeightException('Height can not be negative!')
        this.height = value
    }
    public addHeight(value: number): void {
        this.setHeight(this.getHeight() + value)
    }

    public getDimensions(): Array<number> {
        return [
            this.getHorizontalPosition(),
            this.getVerticalPosition(),
            this.getWidth(),
            this.getHeight(),
        ]
    }

    public getSection(): PdfSection {
        return this.section
    }
    public setSection(section: PdfSection) {
        this.section = section
    }

    public apply(): void {
        Log.info("Adding rectangle to PDF", this.getDimensions(), this.getSection())
        if (!this.getHeight())
            throw new HeightException('Height is invalid.')
        this.top = this.getVerticalPosition()
        this.getSection().getDocument()  
            .rect(
                this.getHorizontalPosition(),
                this.getVerticalPosition(),
                this.getWidth(),
                this.getRealHeight(),
            )
            .fill(Config.pallete.getGrey())
    }

    public pad(): void {
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        Array(this.getTotalPadding()).fill(0).forEach(i => breaks.small())
    }

    public wrap(callback: any): any {
        this.pad()
        this.apply()
        callback({
            x: this.getInnerHorizontalPosition(),
            y: this.getInnerVerticalPosition(),
        })
        this.pad()
    }
}
