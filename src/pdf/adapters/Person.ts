// ----------------------------------------------------------------
// Purpose:
// This class implements the text adapter.
//
// References:
// - https://pdfkit.org/
// ----------------------------------------------------------------

import { Adapter } from '../../interfaces/Adapter'
import { Model } from '../../interfaces/Model'

import { Log } from '../../utils/Logging'
import { Config } from '../../Config'

import { Person } from '../../models/Person'

import { Break } from '../features/Break'

import { PdfSection } from '../Section'

export class PersonAdapter implements Adapter {
    private model: Person = new Person()
    private section: PdfSection = new PdfSection()
    private imageSize: number = 100
    private innerPadding: number = 5
    private outerPadding: number = 3

    private getImageSize(): number { return this.imageSize }

    private getInnerPadding(): number { return this.innerPadding }
    private getOuterPadding(): number { return this.outerPadding }
    private getTotalPadding(): number { return this.getInnerPadding() + this.getOuterPadding() }

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Person { return this.model }
    public setModel(model: Person) { this.model = model }

    public apply(): void {
        Log.info("Adapting person to PDF", this.getModel(), this.getSection())

        // Space before the avatar.
        const breaks: Break = new Break()
        breaks.setSection(this.getSection())
        Array(this.getTotalPadding()).fill(0).forEach(i => breaks.small())

        // Recording the top position.
        const top: number = this.getSection()
            .getCurrentVerticalPosition() - Config.dimensions.getBreak() * this.getInnerPadding()

        // Estimating rectangle size.
        let height: number = 2 * Config.dimensions.getBreak() * this.getInnerPadding()

        // Estimating the text size.
        const bioOptions: object = {
            align: 'left',
            lineBreak: true,
            width: [
                this.getSection().getInnerWidth(),
                - this.getImageSize(),
                - 3 * Config.dimensions.getBreak() * this.getInnerPadding(),
            ].reduce((acc, cur) => acc + cur, 0)
        }
        const bioText: string = this.getModel().bio.get(this.getSection().getLanguage())
        height += this.getSection().getDocument()
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())
            .heightOfString(bioText, bioOptions)

        // Estimating the text size.
        const titleOptions: object = {
            align: 'left',
            lineBreak: true,
            width: this.getSection().getInnerWidth() - 2 * Config.dimensions.getBreak(),
        }
        const titleText: string = this.getModel().name.get(this.getSection().getLanguage())
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getSubtitle())
            .font(Config.typeface.getBold())
            .heightOfString(titleText, titleOptions)
        height += 1 * Config.dimensions.getBreak()

        // Estimating the website size.
        const urlText: string = this.getModel().website.get(this.getSection().getLanguage())
        const urlOptions: object = {
            align: 'left',
            lineBreak: true,
            underline: true,
            width: [
                this.getSection().getInnerWidth(),
                - this.getImageSize(),
                - 3 * Config.dimensions.getBreak() * this.getInnerPadding(),
            ].reduce((acc, cur) => acc + cur, 0)
        }
        if (urlText) {
            height += this.getSection().getDocument()
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getNormal())
                .heightOfString(urlText, urlOptions)
            height += 1 * Config.dimensions.getBreak()
        }

        // Estimating the email size.
        const emailOptions: object = {
            align: 'left',
            lineBreak: true,
            underline: true,
            width: [
                this.getSection().getInnerWidth(),
                - this.getImageSize(),
                - 3 * Config.dimensions.getBreak() * this.getInnerPadding(),
            ].reduce((acc, cur) => acc + cur, 0)
        }
        const emailText: string = this.getModel().email.get(this.getSection().getLanguage())
        if (emailText) {
            height += this.getSection().getDocument()
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getNormal())
                .heightOfString(emailText, emailOptions)
            height += 1 * Config.dimensions.getBreak()
        }

        // Adding grey background.
        this.getSection().getDocument()
            .rect(this.getSection().getMarginLeft(), top, this.getSection().getInnerWidth(), height)
            .fill(Config.pallete.getGrey())

        // Adding title.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getSubtitle())
            .font(Config.typeface.getBold())
            .fillColor(Config.pallete.getBlack())
            .text(
                titleText,
                this.getSection().getMarginLeft() + Config.dimensions.getBreak(),
                top + Config.dimensions.getBreak() * this.getInnerPadding(),
                titleOptions,
            )

        // Recording columns position.
        breaks.small()
        const cols: number = this.getSection()
            .getCurrentVerticalPosition() - Config.dimensions.getBreak() * this.getInnerPadding()

        // Adding image to the document.
        this.getSection().getDocument()
            .image(
                this.getModel().avatar.getPath(),
                this.getSection().getMarginLeft() + this.getInnerPadding(),
                cols + Config.dimensions.getBreak() * this.getInnerPadding(),
                {
                    width: this.getImageSize(),
                }
            )

        // Adding text.
        this.getSection().getDocument()
            .fontSize(Config.dimensions.getNormal())
            .font(Config.typeface.getNormal())
            .fillColor(Config.pallete.getBlack())
            .text(
                bioText,
                this.getSection().getMarginLeft() + 2 * this.getInnerPadding() + this.getImageSize(),
                cols + Config.dimensions.getBreak() * this.getInnerPadding(),
                bioOptions,
            )

        // Adding person website.
        if (urlText) {
            breaks.small()
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getNormal())
                .fillColor(Config.pallete.getPrimary())
                .text(
                    urlText,
                    this.getSection().getMarginLeft() + 2 * this.getInnerPadding() + this.getImageSize(),
                    this.getSection().getCurrentVerticalPosition(),
                    urlOptions,
                )
        }

        // Adding person email.
        if (emailText) {
            breaks.small()
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getSmall())
                .font(Config.typeface.getNormal())
                .fillColor(Config.pallete.getPrimary())
                .text(
                    emailText,
                    this.getSection().getMarginLeft() + 2 * this.getInnerPadding() + this.getImageSize(),
                    this.getSection().getCurrentVerticalPosition(),
                    emailOptions,
                )
        }

        // Space after the avtar.
        Array(this.getTotalPadding()).fill(0).forEach(i => breaks.small())
    }
}
