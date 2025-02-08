export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'Food & Dining'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Utilities'
  | 'Housing'
  | 'Healthcare'
  | 'Income'
  | 'Other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: TransactionCategory;
  createdAt: string; // For sorting/filtering
}

export interface TransactionFormData {
  description: string;
  amount: number | ''; // Allow empty string for form input
  type: TransactionType;
  category: TransactionCategory;
  date?: string; // Optional date input
} 