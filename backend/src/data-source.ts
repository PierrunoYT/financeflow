import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction } from "./entity/Transaction";
import { Category } from "./entity/Category";
import { Budget } from "./entity/Budget";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database/budget.sqlite",
    synchronize: true,
    logging: false,
    entities: [Transaction, Category, Budget],
    migrations: [],
    subscribers: [],
}); 