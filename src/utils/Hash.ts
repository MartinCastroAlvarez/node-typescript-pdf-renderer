// ----------------------------------------------------------------
// Purpose:
// This library defines the Hash class.
// ----------------------------------------------------------------

const crypto = require('crypto')

export abstract class Hash {
    public static digest(data: string) {
        return crypto.createHash('md5').update(data).digest('hex')
    }
}
