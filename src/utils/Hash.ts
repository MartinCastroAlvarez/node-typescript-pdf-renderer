// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Hash class.
// ----------------------------------------------------------------

const crypto = require('crypto')

export abstract class Hash {
    // ----------------------------------------------------------------
    // PURPOSE:
    // Generating a hash out of a list of strings.
    // ----------------------------------------------------------------
    public static digest(data: Array<any>): string {
        const strings: Array<string> = data.map(value => value.toString())
        return crypto.createHash('md5').update(strings.join('-')).digest('hex')
    }
}
