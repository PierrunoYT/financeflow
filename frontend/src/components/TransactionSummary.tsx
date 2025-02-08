import { Transaction } from '../types/transaction';

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export default function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="card bg-green-50 dark:bg-green-900/20">
        <h3 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
          Total Income
        </h3>
        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
          {formatAmount(totalIncome)}
        </p>
      </div>

      <div className="card bg-red-50 dark:bg-red-900/20">
        <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
          Total Expenses
        </h3>
        <p className="text-2xl font-bold text-red-700 dark:text-red-300">
          {formatAmount(totalExpenses)}
        </p>
      </div>

      <div className={`card ${balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20'}`}>
        <h3 className={`text-sm font-medium mb-1 ${
          balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'
        }`}>
          Current Balance
        </h3>
        <p className={`text-2xl font-bold ${
          balance >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'
        }`}>
          {formatAmount(Math.abs(balance))}
          <span className="text-sm font-normal ml-1">
            {balance >= 0 ? '(Surplus)' : '(Deficit)'}
          </span>
        </p>
      </div>
    </div>
  );
} 