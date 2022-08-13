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
import { InvalidImageWidthError } from '../../errors/Image'

export class PersonAdapter implements Adapter {
    private model: Person = new Person()
    private section: PdfSection = new PdfSection()
    private imageSize: number = 50
    private box: Box = new Box()

    public setImageSize(value: number): void {
        if (value == 0)
            throw new InvalidImageWidthError('Image size can not be zero!')
        if (value < 0)
            throw new InvalidImageWidthError('Image size can not be negative!')
        if (value > this.getSection().getInnerWidth())
            throw new InvalidImageWidthError('Image size is larger than the page width!')
        this.imageSize = value
    }
    public getImageSize(): number { return this.imageSize }

    private getRightColumnWidth(): number {
        return [
            this.getSection().getInnerWidth(),
            - this.getImageSize(),
            - 2 * this.box.getInnerPaddingSize(),
        ].reduce((acc, cur) => acc + cur, 0)
    }
    private getRightColumnHorziontalPosition(): number {
        return this.getSection().getMarginLeft() + this.getImageSize() + this.box.getInnerPaddingSize()
    }

    public getSection(): PdfSection { return this.section }
    public setSection(section: PdfSection) { this.section = section }

    public getModel(): Person { return this.model }
    public setModel(model: Person) { this.model = model }

    public apply(): void {
        Log.info("Adapting person to PDF", this.getModel(), this.getSection())

        // Creating a rectangle.
        this.box.setSection(this.getSection())

        // Estimating the text size.
        const bioOptions: object = {
            align: 'left',
            lineBreak: true,
            width: this.getRightColumnWidth(),
        }
        const bioText: string = this.getModel().bio.get(this.getSection().getLanguage())
        this.box.addHeight(
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getNormal())
                .heightOfString(bioText, bioOptions)
        )
        this.box.addHeight(this.box.getInnerPaddingSize())

        // Estimating the text size.
        const titleOptions: object = {
            align: 'left',
            lineBreak: true,
            width: this.getRightColumnWidth(),
        }
        const titleText: string = this.getModel().name.get(this.getSection().getLanguage())
        this.box.addHeight(
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getSubtitle())
                .font(Config.typeface.getItalic())
                .heightOfString(titleText, titleOptions)
        )

        // Estimating the website size.
        const urlText: string = this.getModel().website.get(this.getSection().getLanguage())
        const urlOptions: object = {
            align: 'left',
            lineBreak: true,
            underline: true,
            width: this.getRightColumnWidth(),
        }
        if (urlText) {
            this.box.addHeight(
                this.getSection().getDocument()
                    .fontSize(Config.dimensions.getSmall())
                    .font(Config.typeface.getNormal())
                    .heightOfString(urlText, urlOptions)
            )
            this.box.addHeight(this.box.getInnerPaddingSize())
        }

        // Estimating the email size.
        const emailOptions: object = {
            align: 'left',
            lineBreak: true,
            underline: true,
            width: this.getRightColumnWidth(),
        }
        const emailText: string = this.getModel().email.get(this.getSection().getLanguage())
        if (emailText) {
            this.box.addHeight(
                this.getSection().getDocument()
                    .fontSize(Config.dimensions.getSmall())
                    .font(Config.typeface.getNormal())
                    .heightOfString(emailText, emailOptions)
            )
            this.box.addHeight(this.box.getInnerPaddingSize())
        }

        // Adding content within the grey box.
        this.box.wrap(({x, y}) => {

            // Recording columns position.
            // breaks.small()
            // const cols: number = this.getSection()
            //     .getCurrentVerticalPosition() - Config.dimensions.getBreak() * this.getInnerPadding()

            // Adding image to the document.
            this.getSection().getDocument()
                .image(
                    this.getModel().avatar.getPath(),
                    x,
                    y,
                    {
                        width: this.getImageSize(),
                    }
                )

            // Adding title.
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getSubtitle())
                .font(Config.typeface.getBold())
                .fillColor(Config.pallete.getBlack())
                .text(
                    titleText,
                    this.getRightColumnHorziontalPosition(),
                    y,
                    titleOptions,
                )

            // Adding text.
            this.getSection().getDocument()
                .fontSize(Config.dimensions.getNormal())
                .font(Config.typeface.getItalic())
                .fillColor(Config.pallete.getBlack())
                .text(
                    bioText,
                    this.getRightColumnHorziontalPosition(),
                    this.getSection().getCurrentVerticalPosition() + this.box.getInnerPaddingSize(),
                    bioOptions,
                )

            // Adding person website.
            if (urlText) {
                this.getSection().getDocument()
                    .fontSize(Config.dimensions.getSmall())
                    .font(Config.typeface.getNormal())
                    .fillColor(Config.pallete.getPrimary())
                    .text(
                        urlText,
                        this.getRightColumnHorziontalPosition(),
                        this.getSection().getCurrentVerticalPosition() + this.box.getInnerPaddingSize(),
                        urlOptions,
                    )
            }

            // Adding person email.
            if (emailText) {
                this.getSection().getDocument()
                    .fontSize(Config.dimensions.getSmall())
                    .font(Config.typeface.getNormal())
                    .fillColor(Config.pallete.getPrimary())
                    .text(
                        emailText,
                        this.getRightColumnHorziontalPosition(),
                        this.getSection().getCurrentVerticalPosition() + this.box.getInnerPaddingSize(),
                        emailOptions,
                    )
            }

        })
    }
}
