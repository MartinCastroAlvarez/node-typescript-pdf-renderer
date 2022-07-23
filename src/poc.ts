
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
