// ----------------------------------------------------------------


export interface Cache {
    getKey(): string
    isCached(): boolean
    save(data: any): void
    get(): any
}
