import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { AppDataSource } from "./data-source";
import transactionRoutes from "./routes/transaction.routes";
import categoryRoutes from "./routes/category.routes";
import budgetRoutes from "./routes/budget.routes";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/budgets", budgetRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Ein Fehler ist aufgetreten." });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error during Data Source initialization:", error);
}); 