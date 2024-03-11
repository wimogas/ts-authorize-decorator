export class BaseError extends Error {
    public status: number
    public title: string
    constructor(status?: number, message?: string) {
        super();
        this.status = status;
        this.title = message
    }
}