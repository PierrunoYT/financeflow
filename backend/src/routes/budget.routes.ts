import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Budget } from "../entity/Budget";
import { Category } from "../entity/Category";

const router = Router();
const budgetRepository = AppDataSource.getRepository(Budget);
const categoryRepository = AppDataSource.getRepository(Category);

// Get all budgets
router.get("/", async (req, res) => {
    try {
        const budgets = await budgetRepository.find({
            relations: ["category"]
        });
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Budgets" });
    }
});

// Create budget
router.post("/", async (req, res) => {
    try {
        const { categoryId, ...budgetData } = req.body;
        const category = await categoryRepository.findOneBy({ id: categoryId });
        
        if (!category) {
            return res.status(404).json({ message: "Kategorie nicht gefunden" });
        }

        const budget = budgetRepository.create({
            ...budgetData,
            category
        });

        await budgetRepository.save(budget);
        res.status(201).json(budget);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Erstellen des Budgets" });
    }
});

// Update budget
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryId, ...budgetData } = req.body;
        
        let budget = await budgetRepository.findOneBy({ id: parseInt(id) });
        if (!budget) {
            return res.status(404).json({ message: "Budget nicht gefunden" });
        }

        if (categoryId) {
            const category = await categoryRepository.findOneBy({ id: categoryId });
            if (!category) {
                return res.status(404).json({ message: "Kategorie nicht gefunden" });
            }
            budget.category = category;
        }

        budgetRepository.merge(budget, budgetData);
        await budgetRepository.save(budget);
        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Aktualisieren des Budgets" });
    }
});

// Delete budget
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await budgetRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: "Budget nicht gefunden" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Löschen des Budgets" });
    }
});

export default router; 