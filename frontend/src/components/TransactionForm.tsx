import React, { useState } from 'react';
import { createTransaction } from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../types';
import { PlusCircle, Loader } from 'lucide-react';

interface Props {
  onTransactionCreated: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<Props> = ({ onTransactionCreated }) => {
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<'compra' | 'venta' | 'transferencia'>('compra');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!monto) return;

    setLoading(true);
    try {
      const newTx = await createTransaction({
        user_id: uuidv4(),
        monto: parseFloat(monto),
        tipo,
      });
      onTransactionCreated(newTx);
      setMonto('');
    } catch (error) {
      console.error(error);
      // Ideally show a toast here instead of alert, but alert is fine for now
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent mt-2">
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-3 rounded-xl mr-4">
            <PlusCircle className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">New Transaction</h2>
          <p className="text-sm text-gray-500 font-medium">Enter transaction details below</p>
        </div>
      </div>
        
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">Amount (USD)</label>
            <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400 font-bold">$</span>
                <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full pl-9 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 shadow-sm"
                    placeholder="0.00"
                    required
                />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">Operation Type</label>
            <div className="relative">
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as any)}
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 appearance-none shadow-sm"
                >
                    <option value="compra">Purchase</option>
                    <option value="venta">Sale</option>
                    <option value="transferencia">Transfer</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
            <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 text-white font-semibold py-3.5 px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 relative z-10"
            >
            {loading ? (
                <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="tracking-wide">Processing...</span>
                </>
            ) : (
                <>
                    <span className="tracking-wide">Submit Transaction</span>
                </>
            )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;