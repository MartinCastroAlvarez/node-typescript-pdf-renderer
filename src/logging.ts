// ----------------------------------------------------------------
// Purpose:
// This class implements the Log class.
// ----------------------------------------------------------------

import { Console } from './enums/console'

export class Log {
    public static info(name: string, data: object): void {
        console.log(`${Console.FgCyan}%s${Console.Reset}`, data)
    }
}
