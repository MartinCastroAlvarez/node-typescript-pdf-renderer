// ----------------------------------------------------------------
// Purpose:
// This class is the interface with the User to render the PDF.
//
// Reference:
// - http://pdfkit.org/docs/getting_started.html
// ----------------------------------------------------------------

const readYamlFile = require('read-yaml-file')
const PDFDocument = require('pdfkit')
const path = require('path')
const fs = require('fs')

// This interface is responsible for transforming the User input
// into a Typescript object, suitable for the App class.
interface Parameters {
    name: string
}

class App {
    private name: string
 
    constructor(params: Parameters) {
        // Parsing parameters from CLI arguments.
        this.name = params.name
    }

    run(): void {
        // Main hook.
        throw Error(this.name)
        console.log(`Hello, {this.name}`)
    }
}

export default App

/*

// ----------------------------------------------------------------
// Application constants.
// ----------------------------------------------------------------
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.'

// ----------------------------------------------------------------
// Definining file system structure.
// ----------------------------------------------------------------
const fonts: String = path.join(__dirname, 'fonts')
const images = path.join(__dirname, 'images')
const books = path.join(__dirname, 'books')
const chapters = path.join(__dirname, 'chapters')
const chapters = path.join(__dirname, 'chapters')

throw Error(fonts, images, books, chapters)

let x = {
    normal: 'fonts/montserrat/MontserratAlternates-Light.ttf',
    bold: 'fonts/montserrat/MontserratAlternates-Bold.ttf',
    italic: 'fonts/montserrat/MontserratAlternates-Italic.ttf',
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
readYamlFile('foo.yml').then(data => {
  console.log(data)
  //=> {foo: true}
})

const fonts = {
    normal: 'fonts/montserrat/MontserratAlternates-Light.ttf',
    bold: 'fonts/montserrat/MontserratAlternates-Bold.ttf',
    italic: 'fonts/montserrat/MontserratAlternates-Italic.ttf',
}

// ----------------------------------------------------------------
// Creating a new PDF document object.
// ----------------------------------------------------------------
const doc = new PDFDocument({
    bufferPages: true,
    autoFirstPage: true,
    font: fonts.normal,
    fontSize: 8,
    size: 'A4',
})

// ----------------------------------------------------------------
// Setting style when a new page is added.
// ----------------------------------------------------------------
let pageNumber = 1
doc.on('pageAdded', () => {
    doc
        .font(fonts.bold)
        .text("Page Title")
})

// ----------------------------------------------------------------
// Adding content to the PDF.
// ----------------------------------------------------------------
doc.text(`This text is left aligned. ${lorem}`, {width: 410, align: 'left'})
doc.moveDown()
doc.text(`This text is centered. ${lorem}`, {width: 410, align: 'center'})
doc.moveDown()
doc.text(`This text is right aligned. ${lorem}`, {width: 410, align: 'right'})
doc.moveDown()
doc.text(`This text is justified. ${lorem}`, {width: 410, align: 'justify'})
doc.rect(doc.x, 0, 410, doc.y).stroke()

doc.text('Hello world!', {
    lineBreak: true,
    ellipsis: true,
    indent: 72,
    lineGap: 12,
    wordSpacing: 4,
    characterSpacing: 12
})
doc.text('Hello world!', {lineBreak: true, ellipsis: true, indent: 36})
doc.text('Hello world!', {lineBreak: true, ellipsis: true, paragraphGap: 36})
doc.text('Hello world!', {fill: true, stroke: '#337ab7'})
doc.text('Hello world!', {oblique: true})
doc.text('Hello world!', {link: 'https://google.com', underline: true, strike: true})
doc.text(`This text is justified. ${lorem}`, {columns: 3, columnGap: 15})

for (let i = 0; i < 10; i++) {
    for (let j = 0; i < 50; i++) {
        doc
            .font(fonts.italic)
            .text(`This text is centered. ${lorem}`, {
                width: 410,
                align: 'center',
                font:'Times-Roman',
            })
        doc.moveDown()
    }
    doc.addPage({})
}

// ----------------------------------------------------------------
// Adding page number into the footer.
// ----------------------------------------------------------------
let pages = doc.bufferedPageRange()
for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i)
    let old = doc.page.margins.bottom
    doc.page.margins.bottom = 0
    doc
        .fontSize(18)
        .fillColor('deeppink')
        .text(pageNumber,
            0,
            doc.page.height - (old / 2),
            { align: 'center' }
        )
    doc.page.margins.bottom = old
    pageNumber++
}

// ----------------------------------------------------------------
// Writing PDF to the file system.
// ----------------------------------------------------------------
doc.pipe(fs.createWriteStream('out.pdf'))

// ----------------------------------------------------------------
// End of stream.
// Manually flushing pages that have been buffered.
// ----------------------------------------------------------------
doc.flushPages()
doc.end()
*/
