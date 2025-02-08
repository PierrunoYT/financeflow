import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { Category } from "../entity/Category";

const router = Router();
const transactionRepository = AppDataSource.getRepository(Transaction);
const categoryRepository = AppDataSource.getRepository(Category);

// Get all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await transactionRepository.find({
            relations: ["category"]
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Transaktionen" });
    }
});

// Create transaction
router.post("/", async (req, res) => {
    try {
        const { categoryId, ...transactionData } = req.body;
        const category = await categoryRepository.findOneBy({ id: categoryId });
        
        if (!category) {
            return res.status(404).json({ message: "Kategorie nicht gefunden" });
        }

        const transaction = transactionRepository.create({
            ...transactionData,
            category
        });

        await transactionRepository.save(transaction);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Erstellen der Transaktion" });
    }
});

// Update transaction
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryId, ...transactionData } = req.body;
        
        let transaction = await transactionRepository.findOneBy({ id: parseInt(id) });
        if (!transaction) {
            return res.status(404).json({ message: "Transaktion nicht gefunden" });
        }

        if (categoryId) {
            const category = await categoryRepository.findOneBy({ id: categoryId });
            if (!category) {
                return res.status(404).json({ message: "Kategorie nicht gefunden" });
            }
            transaction.category = category;
        }

        transactionRepository.merge(transaction, transactionData);
        await transactionRepository.save(transaction);
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Aktualisieren der Transaktion" });
    }
});

// Delete transaction
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await transactionRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: "Transaktion nicht gefunden" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Löschen der Transaktion" });
    }
});

export default router; 