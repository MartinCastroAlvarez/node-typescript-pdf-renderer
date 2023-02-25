// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Random class.
// ----------------------------------------------------------------

export abstract class Random {
    public static choice(array: Array<any>) {
        return array[Math.floor(Math.random() * array.length)]
    }
}
