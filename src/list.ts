// ----------------------------------------------------------------
// Purpose:
// This library implements the Array class.
//
// References:
// - https://stackoverflow.com/questions/23096260/
// ----------------------------------------------------------------

export class List<T> {
    private items: Array<T>

    // Lazy constructor.
    constructor() {
        this.items = []
    }

    size(): number {
        return this.items.length
    }

    add(value: T): void {
        this.items.push(value)
    }

    getAll(index: number): T {
        return this.items[index]
    }
}
