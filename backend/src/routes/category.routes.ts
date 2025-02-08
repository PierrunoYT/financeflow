import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

const router = Router();
const categoryRepository = AppDataSource.getRepository(Category);

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await categoryRepository.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Kategorien" });
    }
});

// Create category
router.post("/", async (req, res) => {
    try {
        const category = categoryRepository.create(req.body);
        await categoryRepository.save(category);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Erstellen der Kategorie" });
    }
});

// Update category
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let category = await categoryRepository.findOneBy({ id: parseInt(id) });
        
        if (!category) {
            return res.status(404).json({ message: "Kategorie nicht gefunden" });
        }

        categoryRepository.merge(category, req.body);
        await categoryRepository.save(category);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Aktualisieren der Kategorie" });
    }
});

// Delete category
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoryRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: "Kategorie nicht gefunden" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Löschen der Kategorie" });
    }
});

export default router; 