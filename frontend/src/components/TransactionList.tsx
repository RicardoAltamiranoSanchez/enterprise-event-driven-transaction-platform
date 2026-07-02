import React from 'react';
import { Transaction } from '../types';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, FileText, Calendar, DollarSign, Activity } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  pagination: {
    page: number;
    size: number;
    total: number;
    pages: number;
  };
  onPageChange: (page: number) => void;
}

const TransactionList: React.FC<Props> = ({ transactions, pagination, onPageChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border border-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-slate-50/50 backdrop-blur-sm">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                   <Activity className="w-4 h-4 text-purple-600" />
                   Type
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                   <DollarSign className="w-4 h-4 text-green-600" />
                   Amount
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                 Status
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-blue-600" />
                   Date
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                 Reference ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-100/80">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={clsx(
                      "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
                      tx.tipo === 'compra' && 'bg-blue-100 text-blue-600',
                      tx.tipo === 'venta' && 'bg-purple-100 text-purple-600',
                      tx.tipo === 'transferencia' && 'bg-indigo-100 text-indigo-600'
                    )}>
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-slate-800 capitalize group-hover:text-purple-600 transition-colors">{tx.tipo}</div>
                      <div className="text-xs text-gray-500">Standard Operation</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">
                    ${parseFloat(tx.monto.toString()).toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={clsx(
                      'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm',
                      tx.status === 'procesado' && 'bg-green-100 text-green-800 border border-green-200',
                      tx.status === 'pendiente' && 'bg-yellow-100 text-yellow-800 border border-yellow-200',
                      tx.status === 'fallido' && 'bg-red-100 text-red-800 border border-red-200'
                    )}
                  >
                    {tx.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(tx.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-mono">
                  {tx.id.slice(0, 8)}...{tx.id.slice(-4)}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
                <tr className="bg-slate-50/30">
                    <td colSpan={5} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="bg-slate-100 p-4 rounded-full">
                            <Activity className="w-10 h-10 text-slate-400" />
                          </div>
                          <div className="text-slate-500 font-medium text-lg">No active transactions found</div>
                          <p className="text-slate-400 text-sm max-w-sm">The platform is currently idle. Transactions will appear here in real-time once they are created.</p>
                          <button className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            Generate Demo Data
                          </button>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-slate-50/50 backdrop-blur-sm px-4 py-4 border-t border-gray-100 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{Math.min((pagination.page - 1) * pagination.size + 1, pagination.total === 0 ? 1 : pagination.total)}</span> to <span className="font-medium">{Math.min(pagination.page * pagination.size, pagination.total === 0 ? 1 : pagination.total)}</span> of <span className="font-medium">{pagination.total}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => onPageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* Simple page numbers */}
                {Array.from({ length: pagination.pages || 1 }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={clsx(
                            "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                            pagination.page === page 
                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" 
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        )}
                    >
                        {page}
                    </button>
                ))}
                <button
                  onClick={() => onPageChange(pagination.page + 1)}
                  disabled={pagination.page === (pagination.pages || 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;