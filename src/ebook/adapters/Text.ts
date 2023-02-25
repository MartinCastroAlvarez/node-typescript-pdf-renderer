// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { ModelAdapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Log } from '../../utils/Logging'

import { Alignment } from '../../enums/Alignment'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Text } from '../../models/Text'

import { EmptynessError } from '../../errors/Text'

import { PdfApi } from '../api/Pdf'

// ----------------------------------------------------------------
// Class responsible for rendering a raw text block.
//
// The adapter design pattern allows otherwise incompatible classes
// to work together by converting the interface of one class into
// an interface expected by the clients.
// ----------------------------------------------------------------
export class TextAdapter implements ModelAdapter {
    private model: Text = new Text()
    private prefix: Text = new Text()
    private suffix: Text = new Text()
    private inverted: boolean = false

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Text>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Text { return this.model }
    public setModel(model: Text) { this.model = model }
    public getPrefix(): Text { return this.prefix }
    public setPrefix(model: Text) { this.prefix = model }
    public getSuffix(): Text { return this.suffix }
    public setSuffix(model: Text) { this.suffix = model }

    // ----------------------------------------------------------------
    // Text string getter.
    // ----------------------------------------------------------------
    public getString(): string {
        const s: string = [
            this.getPrefix().isEmpty() ? null : this.getPrefix().get(Context.getLanguage()),
            this.getModel().isEmpty() ? null : this.getModel().get(Context.getLanguage()),
            this.getSuffix().isEmpty() ? null  : this.getSuffix().get(Context.getLanguage()),
        ].filter(x => x).join(' ')
        if (!s) {
            throw new EmptynessError('The text is empty!')
        }
        return s
    }

    // ----------------------------------------------------------------
    // Override the following methods in subclasses.
    // ----------------------------------------------------------------
    public getFont(): string { return Config.typeface.getNormal() }
    public getSize(): number { return Config.dimensions.getNormal() }
    public getAlignment(): Alignment { return Alignment.LEFT } 
    public getIndent(): number { return 0 } 
    public getPaddingTop(): number { return 0 }
    public getPaddingBottom(): number { return 0 }

    // ----------------------------------------------------------------
    // Lets the color of the title be inverted.
    // ----------------------------------------------------------------
    public invert() { this.inverted = ! this.inverted }
    public isInverted(): boolean { return this.inverted }
    public getColor(): string {
        if (this.isInverted())
            return Config.pallete.getWhite()
        return Config.pallete.getBlack()
    }

    // ----------------------------------------------------------------
    // Main method responsible for updating the current section of the
    // product with the new content.
    //
    // The adapter design pattern allows otherwise incompatible classes
    // to work together by converting the interface of one class into
    // an interface expected by the clients.
    //
    // An adapter can be used when the wrapper must respect a particular
    // interface and must support polymorphic behavior.
    // ----------------------------------------------------------------
    public apply(): void {
        Log.info("Adapting text to PDF", this.getModel(), Context.getSection())
        if (!this.getString()) { return }
        const api: PdfApi = Context.getApi() as PdfApi
        api.addSpace(this.getPaddingTop())
        api.addText({
            color: this.getColor(),
            size: this.getSize(),
            font: this.getFont(),
            text: this.getString(),
            align: this.getAlignment(),
            indent: this.getIndent(),
        })
        api.addSpace(this.getPaddingBottom())
    }
}

export class TitleAdapter extends TextAdapter {
    public getFont(): string { return Config.typeface.getCover() }
    public getSize(): number { return Config.dimensions.getTitle() }
    public getIndent(): number { return 0 }
    public getAlignment(): Alignment { return Alignment.CENTER } 
    public getPaddingTop(): number { return Config.dimensions.getPadding() * 10 }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
    public getColor(): string {
        if (this.isInverted())
            return Config.pallete.getWhite()
        return Config.pallete.getPrimary()
    }
}

export class Heading1Adapter extends TitleAdapter {
    public getFont(): string { return Config.typeface.getTitle() }
    public getSize(): number { return Config.dimensions.getHeading1() }
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}

export class Heading2Adapter extends TitleAdapter {
    public getFont(): string { return Config.typeface.getTitle() }
    public getSize(): number { return Config.dimensions.getHeading2() }
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}

export class Heading3Adapter extends TitleAdapter {
    public getFont(): string { return Config.typeface.getTitle() }
    public getSize(): number { return Config.dimensions.getHeading3() }
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}

export class Heading4Adapter extends TitleAdapter {
    public getFont(): string { return Config.typeface.getTitle() }
    public getSize(): number { return Config.dimensions.getHeading4() }
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}

export class ParagraphAdapter extends TextAdapter {
    public getFont(): string { return Config.typeface.getNormal() }
    public getColor(): string { return Config.pallete.getBlack() }
    public getIndent(): number { return Config.dimensions.getNormal() }
    public getAlignment(): Alignment { return Alignment.JUSTIFIED } 
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}

export class LegalTextAdapter extends TextAdapter {
    public getFont(): string { return Config.typeface.getNormal() }
    public getColor(): string { return Config.pallete.getDarkGrey() }
    public getSize(): number { return Config.dimensions.getSmall() }
    public getIndent(): number { return 0 }
    public getAlignment(): Alignment { return Alignment.CENTER } 
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}

export class StrongAdapter extends ParagraphAdapter {
    public getFont(): string { return Config.typeface.getBold() }
    public getColor(): string { return Config.pallete.getPrimary() }
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}

export class CursiveAdapter extends ParagraphAdapter {
    public getFont(): string { return Config.typeface.getItalic() }
    public getColor(): string { return Config.pallete.getDarkGrey() }
    public getPaddingTop(): number { return Config.dimensions.getPadding() }
    public getPaddingBottom(): number { return Config.dimensions.getPadding() }
}
