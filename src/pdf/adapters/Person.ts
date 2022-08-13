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

import { PdfSection } from '../Section'

import { Box } from '../features/Box'

export class PersonAdapter implements Adapter {
    private model: Person = new Person()
    private section: PdfSection = new PdfSection()
    private imageSize: number = 100

    private getImageSize(): number { return this.imageSize }

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Person { return this.model }
    public setModel(model: Person) { this.model = model }

    public apply(): void {
        Log.info("Adapting person to PDF", this.getModel(), this.getSection())

        // Creating a rectangle.
        const box: Box = new Box()
        box.setSection(this.getSection())

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
        box.addHeight(
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getNormal())
                .heightOfString(bioText, bioOptions)
        )

        // Estimating the text size.
        const titleOptions: object = {
            align: 'left',
            lineBreak: true,
            width: this.getSection().getInnerWidth() - 2 * Config.dimensions.getBreak(),
        }
        const titleText: string = this.getModel().name.get(this.getSection().getLanguage())
        box.addHeight(
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getSubtitle())
                .font(Config.typeface.getBold())
                .heightOfString(titleText, titleOptions)
        )

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
            box.addHeight(
                this.getSection().getDocument()
                    .fontSize(Config.dimensions.getSmall())
                    .font(Config.typeface.getNormal())
                    .heightOfString(urlText, urlOptions)
            )
            // height += 2 * Config.dimensions.getBreak()
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
            box.addHeight(
                this.getSection().getDocument()
                    .fontSize(Config.dimensions.getSmall())
                    .font(Config.typeface.getNormal())
                    .heightOfString(emailText, emailOptions)
            )
        }

        // Adding content within the grey box.
        box.wrap(({x, y}) => {

            // Adding title.
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getSubtitle())
                .font(Config.typeface.getBold())
                .fillColor(Config.pallete.getBlack())
                .text(
                    titleText,
                    x,
                    y,
                    titleOptions,
                )

            // Recording columns position.
            // breaks.small()
            // const cols: number = this.getSection()
            //     .getCurrentVerticalPosition() - Config.dimensions.getBreak() * this.getInnerPadding()

            // Adding image to the document.
            /*
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
            */

        })
    }
}
