import React from 'react';
import DetailHeader from './components/DetailHeader';
import DetailTabs from './components/DetailTabs';

function TrainerDetail() {
  return (
    <div className="space-y-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <DetailHeader />
      <DetailTabs />
    </div>
  );
}

export default TrainerDetail;

