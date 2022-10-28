// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Person adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { ModelAdapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Alignment } from '../../enums/Alignment'

import { Log } from '../../utils/Logging'

import { Config } from '../../Config'
import { Context } from '../../Context'

import { Person } from '../../models/Person'

import { BoxAdapter } from './Box'

import { ImageNotFoundError } from '../../errors/Image'

import { PdfApi } from '../api/Pdf'

export class PersonAdapter implements ModelAdapter {
    private model: Person = new Person()
    private box: BoxAdapter = new BoxAdapter()

    // ----------------------------------------------------------------
    // Model adapter constructor.
    // ----------------------------------------------------------------
    constructor(model: Model) { this.setModel(<Person>model) }
    
    // ----------------------------------------------------------------
    // Model adapter getter & setter.
    // ----------------------------------------------------------------
    public getModel(): Person { return this.model }
    public setModel(model: Person) { this.model = model }

    // Image options.
    private getImageOptions(x: number = null, y: number = null): object {
        if (!this.getModel().avatar.getPath()) {
            throw new ImageNotFoundError('Invalid Person image!')
        }
        return {
            path: this.getModel().avatar.getPath(),
            x: x,
            y: y,
            width: Config.dimensions.getAvatar(),
            height: Config.dimensions.getAvatar(),
        }
    }

    // Title options.
    private getNameOptions(y: number = null): object {
        return {
            size: Config.dimensions.getHeading3(),
            font: Config.typeface.getTitle(),
            color: Config.pallete.getDarkGrey(),
            align: Alignment.LEFT,
            text: this.getModel().name.get(Context.getLanguage()),
            x: this.getRightColumnHorziontalPosition(),
            y: y,
            width: this.getRightColumnWidth(),
        }
    }

    // Text options.
    private getTextOptions(): object {
        return {
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getNormal(),
            color: Config.pallete.getDarkGrey(),
            align: Alignment.JUSTIFIED,
            x: this.getRightColumnHorziontalPosition(),
            text: this.getModel().bio.get(Context.getLanguage()),
            width: this.getRightColumnWidth(),
        }
    }

    // Email options.
    private getEmailOptions (): object {
        return {
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getItalic(),
            color: Config.pallete.getDarkGrey(),
            align: Alignment.LEFT,
            text: this.getModel().email.get(Context.getLanguage()),
            link: this.getModel().email.get(Context.getLanguage()),
            x: this.getRightColumnHorziontalPosition(),
            width: this.getRightColumnWidth(),
        }
    }

    // URL options.
    private getUrlOptions(): object {
        return {
            size: Config.dimensions.getNormal(),
            font: Config.typeface.getItalic(),
            color: Config.pallete.getDarkGrey(),
            align: Alignment.LEFT,
            text: this.getModel().website.get(Context.getLanguage()),
            link: this.getModel().website.get(Context.getLanguage()),
            x: this.getRightColumnHorziontalPosition(),
            width: this.getRightColumnWidth(),
        }
    }

    // ----------------------------------------------------------------
    // Estimating layout dimensions.
    // ----------------------------------------------------------------
    private getRightColumnWidth(): number {
        const api: PdfApi = Context.getApi() as PdfApi
        return [
            api.getInnerWidth(),
            - Config.dimensions.getAvatar(),
            - 3 * Config.dimensions.getPadding(),
        ].reduce((acc, cur) => acc + cur, 0)
    }
    private getRightColumnHorziontalPosition(): number {
        return [
            Config.dimensions.getMargin(),
            Config.dimensions.getAvatar(),
            Config.dimensions.getPadding() * 2,
        ].reduce((acc, cur) => acc + cur, 0)
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
        Log.info("Adapting Person to PDF", this.getModel(), Context.getSection())
        const api: PdfApi = Context.getApi() as PdfApi
        this.box.addHeight(api.sizeOf(this.getTextOptions()))
        this.box.addHeight(api.sizeOf(this.getNameOptions()))
        if (this.getModel().website.get(Context.getLanguage())) {
            this.box.addHeight(api.sizeOf(this.getUrlOptions()))
        }
        if (this.getModel().email.get(Context.getLanguage())) {
            this.box.addHeight(api.sizeOf(this.getEmailOptions()))
        }
        this.box.wrap(({x, y}) => {
            api.addImage(this.getImageOptions(x, y))
            api.addText(this.getNameOptions(y))
            api.addText(this.getTextOptions())
            if (this.getModel().website.get(Context.getLanguage())) {
                api.addText(this.getUrlOptions())
            }
            if (this.getModel().email.get(Context.getLanguage())) {
                api.addText(this.getEmailOptions())
            }
        })
    }
}
