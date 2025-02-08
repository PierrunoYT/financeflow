import { useState, useEffect } from 'react'
import { Transaction, TransactionFormData } from './types/transaction'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import TransactionSummary from './components/TransactionSummary'

// Local storage key
const STORAGE_KEY = 'financeflow_transactions';

// Sort options
type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Load saved transactions from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (formData: TransactionFormData) => {
    try {
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        description: formData.description.trim(),
        amount: parseFloat(formData.amount.toString()),
        type: formData.type,
        category: formData.category,
        date: formData.date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
      console.error('Failed to add transaction:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Get unique categories from transactions
  const categories = ['all', ...new Set(transactions.map(t => t.category))];

  // Sort and filter transactions
  const sortedAndFilteredTransactions = transactions
    .filter(t => filterCategory === 'all' || t.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            FinanceFlow
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Smart financial management made simple
          </p>
        </header>

        <TransactionSummary transactions={transactions} />
        <TransactionForm onSubmit={handleAddTransaction} />

        {transactions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort by
              </label>
              <select
                id="sort"
                className="input w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="date-desc">Date (Newest first)</option>
                <option value="date-asc">Date (Oldest first)</option>
                <option value="amount-desc">Amount (Highest first)</option>
                <option value="amount-asc">Amount (Lowest first)</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Category
              </label>
              <select
                id="category"
                className="input w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <TransactionList
          transactions={sortedAndFilteredTransactions}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}
