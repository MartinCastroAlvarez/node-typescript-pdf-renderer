// ----------------------------------------------------------------
// Purpose:
// This library defines the Adapter interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

import PDFDocument from 'pdfkit'

export interface Adapter {
    render(doc: PDFDocument) : doc
}
