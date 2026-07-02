import { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import Notification from '../components/Notification';

const CreateTransactionView = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCreated = () => {
    setNotification({ message: 'Transacción creada y enviada al proceso asíncrono.', type: 'success' });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Transaction</h1>
        <p className="text-slate-500 mt-2">Issue a new operation into the enterprise pipeline.</p>
      </div>

      <TransactionForm onTransactionCreated={handleCreated} />
      
      <Notification 
          message={notification?.message || null} 
          type={notification?.type || 'success'} 
          onClose={() => setNotification(null)} 
      />
    </div>
  );
};

export default CreateTransactionView;
