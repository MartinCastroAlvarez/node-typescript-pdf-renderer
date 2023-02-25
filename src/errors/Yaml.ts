// ----------------------------------------------------------------
// PURPOSE:
// This export class implements YAML errors.
// ----------------------------------------------------------------

export class YamlError extends Error {}

export class NotImplementedError extends YamlError {}

export class InvalidReferenceError extends YamlError {}
