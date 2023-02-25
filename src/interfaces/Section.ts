// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Section interface.
// ----------------------------------------------------------------

import { Api }  from './Api'

export interface Section {
    toString(): string
    getApi(): Api
    getHeader(): Array<string>
    getIndex(): Array<string>
    setHeader(): void
    setNumeration(offset: number): void
    build(): void
    render(path: string): Promise<string>
}
