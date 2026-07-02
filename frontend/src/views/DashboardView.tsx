import { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';
import { Transaction } from '../types';
import TransactionList from '../components/TransactionList';
import MetricCards from '../components/MetricCards';
import { useWebSocket } from '../hooks/useWebSocket';

const DashboardView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState({ page: 1, size: 10, total: 0, pages: 1 });
  const lastMessage = useWebSocket();

  const fetchTransactions = async (page = 1) => {
    try {
      const data = await getTransactions(page, pagination.size);
      setTransactions(data.items);
      setPagination({
        page: data.page,
        size: data.size,
        total: data.total,
        pages: data.pages
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'transaction_update') {
      const { transaction_id, status, updated_at } = lastMessage.data;
      setTransactions((prev) => 
        prev.map((tx) => 
          tx.id === transaction_id ? { ...tx, status, processed_at: updated_at } : tx
        )
      );
    }
  }, [lastMessage]);

  const handlePageChange = (newPage: number) => {
      fetchTransactions(newPage);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Real-time metrics and recent transactional activity.</p>
      </div>

      <MetricCards total={pagination.total} transactions={transactions} />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Recent Transactions</h2>
      </div>
      
      <TransactionList 
          transactions={transactions} 
          pagination={pagination}
          onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DashboardView;
