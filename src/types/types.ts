export interface User {
    name: string,
    email: string,
    picture: string
}

export interface Account {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string,
}

export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    stock: number,
    section: Section

}

export interface Section {
    id: number,
    name: string
}

export interface Item {
    id: number,
    product: Product,
    amount: number,
    order: Order | null
}

export interface TempItem {
    product: Product,
    amount: number,
}

export interface Order {
    id: number,
    user: Account,
    items: Item[],
    delivered: boolean,
    paid: boolean
}

export interface TempOrder {
    user: Account,
    items: Item[],
    delivered: boolean,
    paid: boolean
}
