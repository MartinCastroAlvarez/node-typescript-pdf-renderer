// ----------------------------------------------------------------
// Purpose:
// This library defines the Model interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

import PDFDocument from 'pdfkit'

export interface Model {
    toJson() : Map<str, str>
    toString() : Map<str, str>
}
