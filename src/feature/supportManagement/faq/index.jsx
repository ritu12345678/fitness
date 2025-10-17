import React from 'react';
import FaqFilter from './components/FaqFilter';
import FaqList from './components/FaqList';

const Faq = () => {
  return (
    <div className="space-y-4">
      <FaqFilter />
      <FaqList />
    </div>
  );
};

export default Faq;


