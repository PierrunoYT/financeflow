import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Budget {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column("decimal", { precision: 10, scale: 2 })
    plannedAmount: number;

    @ManyToOne(() => Category)
    category: Category;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 