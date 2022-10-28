// ----------------------------------------------------------------
// PURPOSE:
// This export class implements Tree errors.
// ----------------------------------------------------------------

export class TreeError extends Error {}

export class FileNotFoundError extends TreeError {}

export class DirectoryNotFoundError extends TreeError {}

export class FileAlreadyExistsError extends TreeError {}
