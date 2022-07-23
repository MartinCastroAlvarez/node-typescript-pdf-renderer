// ----------------------------------------------------------------
// Purpose:
// This library defines the YamlAdapter interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

export interface YamlAdapter {
    render(doc: PDFDocument): doc
}
