import React from 'react';
import PageList from './components/PageList';
import PageFilter from './components/PageFilter';

function PagesFeature() {
  return (
    <div className="space-y-6">
      <PageFilter />
      <PageList />
    </div>
  );
}

export default PagesFeature;


