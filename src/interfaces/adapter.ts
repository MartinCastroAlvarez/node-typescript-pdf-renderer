// ----------------------------------------------------------------
// Purpose:
// This class implements the Adapter interface.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

export interface Adapter {
    public adapt(...args: any[])
}
