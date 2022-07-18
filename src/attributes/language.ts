// ----------------------------------------------------------------
// Purpouse:
// This library implements the Enum for supported languages.
// ----------------------------------------------------------------

// This enum defines the supported languages.
export enum Language {
    en,
    es,
}

// This exception is raised when the User attempts to
// render a book using an unsupported language.
export class LanguageError extends Error {}

// This class implements a language-aware interface for subclasses.
// Classes inheriting from this class can support multiple languages.
export abstract class WithLanguage {
    private language: Language

    // Language getter.
    getLanguage() : Language {
        return this.language
    }

    // Settings language or raising LanguageError.
    setLanguage(language: Language) {
        if (language === null)
            throw new LanguageError('Invalid language')
        this. language = language
    }
}
