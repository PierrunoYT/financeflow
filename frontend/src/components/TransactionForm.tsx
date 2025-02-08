import { useState } from 'react';
import { TransactionFormData, TransactionType, TransactionCategory } from '../types/transaction';

const CATEGORIES: TransactionCategory[] = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Housing',
  'Healthcare',
  'Income',
  'Other'
];

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
}

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    description: '',
    amount: '',
    type: 'expense',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0]
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    if (formData.description.trim().length < 3) {
      setError('Description must be at least 3 characters long');
      return false;
    }
    if (formData.description.trim().length > 50) {
      setError('Description must be less than 50 characters');
      return false;
    }
    if (!formData.amount || parseFloat(formData.amount.toString()) <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }
    if (parseFloat(formData.amount.toString()) > 999999999) {
      setError('Amount is too large');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) return;

    try {
      onSubmit(formData);
      setSuccess(true);
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: CATEGORIES[0],
        date: new Date().toISOString().split('T')[0]
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to add transaction. Please try again.');
    }
  };

  const handleTypeChange = (type: TransactionType) => {
    setFormData(prev => ({ ...prev, type }));
    // Auto-select Income category for income type
    if (type === 'income') {
      setFormData(prev => ({ ...prev, type, category: 'Income' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
          Transaction added successfully!
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <button
          type="button"
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            formData.type === 'expense' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleTypeChange('expense')}
        >
          Expense
        </button>
        <button
          type="button"
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            formData.type === 'income' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleTypeChange('income')}
        >
          Income
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="e.g., Grocery shopping"
            className="input w-full"
            value={formData.description}
            onChange={e => {
              setError('');
              setFormData(prev => ({ ...prev, description: e.target.value }));
            }}
            maxLength={50}
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            max="999999999"
            placeholder="0.00"
            className="input w-full"
            value={formData.amount}
            onChange={e => {
              setError('');
              setFormData(prev => ({ ...prev, amount: e.target.value ? parseFloat(e.target.value) : '' }));
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="input w-full"
            value={formData.date}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            className="input w-full"
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as TransactionCategory }))}
            required
          >
            {CATEGORIES.filter(category => 
              formData.type === 'income' ? category === 'Income' : category !== 'Income'
            ).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full flex items-center justify-center"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
} 