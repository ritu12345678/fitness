import React from 'react';
import { Box, Button, Chip, Typography, TextField } from '@mui/material';

function CategoryTab() {
  const [categories, setCategories] = React.useState(['Beginner', 'Advance', 'Intermediate']);
  const [input, setInput] = React.useState('');

  const addCategory = () => {
    const v = input.trim();
    if (!v) return;
    if (!categories.includes(v)) setCategories((p) => [...p, v]);
    setInput('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <Typography sx={{ fontWeight: 600 }}>Category</Typography>
        <Button variant="contained" onClick={addCategory} sx={{ backgroundColor: '#F6A5A5', color: '#000', borderRadius: 2, boxShadow: 'none', '&:hover': { backgroundColor: '#f4a0a0' } }}>+ Add</Button>
      </div>
      <TextField
        fullWidth
        placeholder="Beginner, Advance, Intermediate"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
        {categories.map((c) => (
          <Chip key={c} label={c} size="small" sx={{ borderRadius: 1.5 }} />
        ))}
      </Box>
    </div>
  );
}

export default CategoryTab;











