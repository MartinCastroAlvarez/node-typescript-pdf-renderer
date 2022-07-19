// ----------------------------------------------------------------
// Purpose:
// This library defines the YamlAdapter interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

import PDFDocument from 'pdfkit'

export interface YamlAdapter {
    render(doc: PDFDocument): doc
}
