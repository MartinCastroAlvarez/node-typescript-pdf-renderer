// ----------------------------------------------------------------
// PURPOSE:
// This class implements the PDF API class.
//
// FACADE SOFTWARE PATTERN:
// Facade is a structural design pattern that provides a simplified
// interface to a library, a framework, or any other complex set of classes.
// ----------------------------------------------------------------

const PDFDocument = require('pdfkit')

import { Api } from '../../interfaces/Api'

import { Log } from '../../utils/Logging'
import { Form } from '../../utils/Form'

import { Config } from '../../Config'

import { Alignment } from '../../enums/Alignment'

interface Text {
    color?: string
    indent?: number
    size?: number
    break?: boolean
    font?: string
    text?: string
    link?: string
    align?: Alignment
    x?: number
    y?: number
    width?: number
    height?: number
}

interface List {
    color?: string
    size?: number
    font?: string
    text?: Array<string>
    align?: Alignment
    x?: number
    y?: number
}

interface Image {
    path?: string
    width?: number
    height?: number
    x?: number
    y?: number
}

interface Rectangle {
    color1?: string
    color2?: string
    width?: number
    height?: number
    x?: number
    y?: number
}

export class PdfApi implements Api {
    private doc: any = new PDFDocument()

    // Building a new empty document.
    constructor() {
        Log.info('Creating a new empty PDFDocument instance.')
        this.setDocument(
            new PDFDocument({
                bufferPages: true,
                autoFirstPage: true,
                size: 'A4',
                margins: {
                    left: this.getMarginLeft(),
                    right: this.getMarginRight(),
                    top: this.getMarginTop(),
                    bottom: this.getMarginBottom(),
                }
            })
        )
    }

    // To string.
    public toString(): string {
        return `${this.constructor.name}[${this.getTotalPages()}]`
    }

    // ----------------------------------------------------------------
    // Document management.
    // ----------------------------------------------------------------
    public setDocument(doc: any) { this.doc = doc }
    public getDocument(): any { return this.doc }

    // ----------------------------------------------------------------
    // Page management.
    // ----------------------------------------------------------------
    public getPage(): any {
        return this.getDocument().page
    }
    public getTotalPages(): number {
        return this.getDocument().bufferedPageRange().count
    }
    public addPage() {
        Log.info('Adding an unnumbered page', this)
        this.getDocument().addPage()
    }
    public addUnnumberedPage() {
        Log.info('Adding an unnumbered page', this)
        this.getDocument().addPage()
        this.getPage().unnumbered = true
    }
    public goTo(page: number) {
        Log.info('Moving to page', page)
        this.getDocument().switchToPage(page)
    }
    public getPages(): Array<number> {
        const pages: Array<number> = []
        for (let page = 0; page < this.getTotalPages(); page++) {
            pages.push(page)
        }
        return pages
    }
    public getNumberedPages(): Array<number> {
        const pages: Array<number> = []
        for (let page = 0; page < this.getTotalPages(); page++) {
            this.goTo(page)
            if (!this.getPage().unnumbered) {
                pages.push(page)
            }
        }
        return pages
    }

    // ----------------------------------------------------------------
    // Dimensions management.
    // ----------------------------------------------------------------
    public getWidth(): number { return this.getPage().width }
    public getHeight(): number { return this.getPage().height }
    public getInnerWidth(): number {
        return this.getPage().width - this.getMarginLeft() - this.getMarginRight()
    }
    public getInnerHeight(): number {
        return this.getPage().height - this.getMarginBottom() - this.getMarginTop()
    }

    // ----------------------------------------------------------------
    // Margin management.
    // ----------------------------------------------------------------
    public getMarginLeft(): number { return this.getPage().margins.left }
    public getMarginRight(): number { return this.getPage().margins.right }
    public getMarginTop(): number { return this.getPage().margins.top }
    public getMarginBottom(): number { return this.getPage().margins.bottom }
    public setMarginLeft(margin: number) { this.getPage().margins.left = margin }
    public setMarginRight(margin: number) { this.getPage().margins.right = margin }
    public setMarginTop(margin: number) { this.getPage().margins.top = margin }
    public setMarginBottom(margin: number) { this.getPage().margins.bottom = margin }
    public resetMarginLeft() { this.getPage().margins.left = Config.dimensions.getMargin() }
    public resetMarginRight() { this.getPage().margins.right = Config.dimensions.getMargin() }
    public resetMarginTop() { this.getPage().margins.top = Config.dimensions.getMargin() }
    public resetMarginBottom() { this.getPage().margins.bottom = Config.dimensions.getMargin() }

    // ----------------------------------------------------------------
    // Position management.
    // ----------------------------------------------------------------
    public getCurrentHorizontalPosition(): number { return this.getDocument().x }
    public getCurrentVerticalPosition(): number { return this.getDocument().y }

    // ----------------------------------------------------------------
    // Rendering document.
    // ----------------------------------------------------------------
    public async flush(stream: object) {
        this.getDocument().pipe(stream)
        this.getDocument().flushPages()
        this.getDocument().end()
    }
    public render(path: string) {}

    // ----------------------------------------------------------------
    // Adding spaces to the document.
    // ----------------------------------------------------------------
    public addSpace(size: number = 0) {
        Log.info("Adding break to PDF", this, size.toString())
        this.getDocument()  
            .fontSize(size)
            .font(Config.typeface.getNormal())
            .text(
                "\n",
                this.getMarginLeft(),
                this.getCurrentVerticalPosition(),
            )
    }

    // ----------------------------------------------------------------
    // Adding text to the document.
    // ----------------------------------------------------------------
    public addText(config: Text) {
        Log.info("Adding text to PDF", this, config)
        const options: object = {
            lineBreak: config.break === undefined ? true : config.break,
            indent: config.indent || 0,
            align: config.align || Alignment.JUSTIFIED,
            width: config.width || this.getInnerWidth(),
            link: config.link || undefined,
        }
        if (config.x === undefined || config.x === null)
            config.x = this.getMarginLeft()
        if (config.y === undefined || config.y === null)
            config.y = this.getCurrentVerticalPosition()
        Log.info("Text config", this, config, options)
        Form.validatePositiveInteger(config.x)
        Form.validatePositiveInteger(config.y)
        Form.validatePositiveInteger(config.size)
        Form.validateNonEmptyString(config.text)
        Form.validateNonEmptyString(config.font)
        Form.validateNonEmptyString(config.color)
        this.getDocument()
            .fontSize(config.size)
            .font(config.font)
            .fillColor(config.color)
            .text(config.text, config.x, config.y, options)
    } 
    public widthOf(config: Text): number {
        Log.info("Estimating width in PDF", this, config)
        const options: object = {
            lineBreak: true,
            indent: config.indent || 0,
            align: config.align || Alignment.JUSTIFIED,
            height: config.height || undefined,
        }
        if (config.x === undefined || config.x === null)
            config.x = this.getMarginLeft()
        if (config.y === undefined || config.y === null)
            config.y = this.getCurrentVerticalPosition()
        Log.info("Text config", this, config, options)
        Form.validatePositiveInteger(config.x)
        Form.validatePositiveInteger(config.y)
        Form.validatePositiveInteger(config.size)
        Form.validateNonEmptyString(config.text)
        Form.validateNonEmptyString(config.font)
        Form.validateNonEmptyString(config.color)
        return this.getDocument()
            .fontSize(config.size)
            .font(config.font)
            .widthOfString(config.text, options)
    } 
    public sizeOf(config: Text): number {
        Log.info("Estimating height in PDF", this, config)
        const options: object = {
            lineBreak: true,
            indent: config.indent || 0,
            align: config.align || Alignment.JUSTIFIED,
            width: config.width || undefined,
        }
        if (config.x === undefined || config.x === null)
            config.x = this.getMarginLeft()
        if (config.y === undefined || config.y === null)
            config.y = this.getCurrentVerticalPosition()
        Log.info("Text config", this, config, options)
        Form.validatePositiveInteger(config.x)
        Form.validatePositiveInteger(config.y)
        Form.validatePositiveInteger(config.size)
        Form.validateNonEmptyString(config.text)
        Form.validateNonEmptyString(config.font)
        Form.validateNonEmptyString(config.color)
        return this.getDocument()
            .fontSize(config.size)
            .font(config.font)
            .heightOfString(config.text, options)
    } 
    public addList(config: List) {
        Log.info("Adding list to PDF", this, config)
        const options: object = {
            indent: 0,
            align: Alignment.LEFT,
            bulletRadius: Config.dimensions.getSmall() / 4,
            bulletIndent: Config.dimensions.getSmall() / 2,
            textIndent: Config.dimensions.getNormal(),
            lineBreak: true,
        }
        if (config.x === undefined)
            config.x = this.getMarginLeft()
        if (config.y === undefined)
            config.y = this.getCurrentVerticalPosition()
        this.getDocument()
            .fontSize(config.size)
            .font(config.font)
            .fillColor(config.color)
            .list(config.text, config.x, config.y, options)
    } 

    // ----------------------------------------------------------------
    // Adding image to the document.
    // ----------------------------------------------------------------
    public addImage(config: Image) {
        Log.info("Adding image to PDF", this, config)
        if (config.x === undefined)
            config.x = this.getMarginLeft()
        if (config.y === undefined)
            config.y = this.getCurrentVerticalPosition()
        if (config.width === undefined)
            config.width = this.getWidth()
        if (config.height === undefined)
            config.height = this.getHeight()
        Form.validatePositiveInteger(config.x)
        Form.validatePositiveInteger(config.y)
        Form.validatePositiveInteger(config.width)
        Form.validatePositiveInteger(config.height)
        const options: object = {
            lineBreak: true,
            width: config.width,
            height: config.height,
        }
        this.getDocument()  
            .image(config.path, config.x, config.y, options)
    }

    // ----------------------------------------------------------------
    // Adding rectangle to the document.
    // ----------------------------------------------------------------
    public addRectangle(config: Rectangle) {
        Log.info("Adding rectangle ", this, config)
        if (config.x === undefined)
            config.x = this.getMarginLeft()
        if (config.y === undefined)
            config.y = this.getCurrentVerticalPosition()
        if (config.width === undefined)
            config.width = this.getWidth()
        if (config.height === undefined)
            config.height = this.getHeight()
        Form.validatePositiveInteger(config.x)
        Form.validatePositiveInteger(config.y)
        Form.validatePositiveInteger(config.width)
        Form.validatePositiveInteger(config.height)
        let color: any = config.color1
        if (config.color2) {
            color = this.getDocument().linearGradient(0, 0, config.width, config.height)
            color.stop(0, config.color1)
            color.stop(1, config.color2)
        }
        this.getDocument().rect(config.x, config.y, config.width, config.height).fill(color)
    } 
}
