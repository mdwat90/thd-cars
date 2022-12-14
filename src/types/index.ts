export type Car = {
    make: string,
	model: string,
	package: string,
	color: string,
	year: number,
	category: string,
	mileage: number,
	price: number,
	date: string,
	id?: string,
}

export interface CarData {
    [key: string]: Car
}

export enum ENV {
    dev = "development"
}

export interface ENV_URL {
    [ENV.dev]: "localhost:3000"
}