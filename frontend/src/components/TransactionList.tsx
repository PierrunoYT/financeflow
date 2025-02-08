import { useState } from 'react';
import { Transaction } from '../types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleTransactions = transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await onDelete(id);
      setDeleteId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (transactions.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">No transactions yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {visibleTransactions.map(transaction => (
          <div
            key={transaction.id}
            className="card flex items-center justify-between hover:shadow-lg transition-shadow relative"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-2 h-12 rounded-l-xl ${
                  transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <div>
                <h3 className="font-medium">{transaction.description}</h3>
                <div className="text-sm text-gray-500 space-x-2">
                  <span>{formatDate(transaction.date)}</span>
                  <span>•</span>
                  <span>{transaction.category}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span
                className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'} {formatAmount(transaction.amount)}
              </span>
              
              {deleteId === transaction.id ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    disabled={isLoading}
                    className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm transition-colors disabled:opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    disabled={isLoading}
                    className="text-gray-600 hover:text-gray-800 px-2 py-1 rounded text-sm transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteId(transaction.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete transaction"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-secondary px-3 py-1 disabled:opacity-50"
          >
            Previous
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-secondary px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
} 