// ----------------------------------------------------------------
// PURPOSE:
// This class implements the Log class.
//
// References:
// - https://nodejs.org/api/util.html#utilinspectobject-options
// ----------------------------------------------------------------

const util = require('util')

import { Console } from '../enums/Console'

export class Log {
    public static serialise(data: any) {
        return util.inspect(data, {
            depth: 1,
            maxArrayLength: 3,
            maxStringLength: 100,
            breakLength: 1000000,
            sorted: true,
            compact: true,
        })
    }

    public static info(label: string, ...data: Array<any>): void {
        console.log(
            '%s [!] - %s - %s%s: %s',
            Console.Bright,
            new Date(),
            label,
            Console.Reset,
            Log.serialise(data),
        )
    }

    public static error(label: string, ...data: Array<any>): void {
        console.log(
            '%s%s [x] - %s - %s%s: %s',
            Console.FgRed,
            Console.Blink,
            new Date(),
            label,
            Console.Reset,
            Log.serialise(data),
        )
    }

    public static success(label: string, ...data: Array<any>): void {
        console.log(
            '%s%s [✔] - %s - %s: %s',
            Console.BgGreen,
            Console.FgWhite,
            new Date(),
            label,
            Console.Reset,
            Log.serialise(data),
        )
    }
}
