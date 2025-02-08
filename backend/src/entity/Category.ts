import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({
        type: "varchar",
        enum: ["income", "expense"]
    })
    type: "income" | "expense";

    @Column({ default: "#000000" })
    color: string;

    @Column({ default: "default" })
    icon: string;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 