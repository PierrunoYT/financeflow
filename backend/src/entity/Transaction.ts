import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        enum: ["income", "expense"]
    })
    type: "income" | "expense";

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @ManyToOne(() => Category, category => category.transactions)
    category: Category;

    @Column({ type: "date" })
    date: Date;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 