import React from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../../../services/apiClient';
import DetailHeader from './components/DetailHeader';
import AddBankDetailModal from './components/AddBankDetailModal';
import DetailTabs from './components/DetailTabs';

function TrainerDetail() {
  const { userId } = useParams();
  const [trainer, setTrainer] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [bankModalOpen, setBankModalOpen] = React.useState(false);

  React.useEffect(() => {
    const loadTrainer = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get(`users/${userId}`);
     
        setTrainer(response?.data );
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };
    loadTrainer();
  }, [userId]);

  return (
    <div className="space-y-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <DetailHeader trainer={trainer} onEdit={() => setBankModalOpen(true)} />
      <DetailTabs trainer={trainer} loading={loading} error={error} />
      <AddBankDetailModal
        open={bankModalOpen}
        onClose={() => setBankModalOpen(false)}
        onSave={async (bank) => {
          // TODO: Replace with real API when available
          console.log('Saving bank details', bank);
        }}
      />
    </div>
  );
}

export default TrainerDetail;

