import React from 'react';
import StudioCard from './StudioCard';

const sampleImages = [
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596357395104-5b6b2c0f0b38?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571907480495-3b21a6543571?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1546484959-fbdd7a23f533?q=80&w=1200&auto=format&fit=crop',
];

const mock = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  image: sampleImages[i % sampleImages.length],
  title: 'Best Fitness Workout',
  address: 'White Field, Bangalore',
  time: '06.00 AM - 11.00 PM',
  price: '₹1600/Mo*',
  active: true,
}));

const StudioGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mock.map((s) => (
        <StudioCard key={s.id} studio={s} />
      ))}
    </div>
  );
};

export default StudioGrid;


