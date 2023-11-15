export interface IContact {
    id: string,
    _id: string,
    name: string,
    email: string,
    phone: string,
    message: string,
    resolved: boolean,
    createAt: string,
    resolvedAt: string
}

export interface IContactCommand {
    name: string,
    email: string,
    phone: string,
    message: string,
}